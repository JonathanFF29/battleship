import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseFirestoreService } from 'src/app/shared/services/firebase-firestore.service';
import { History } from "../../shared/models/history";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  board: any[][] = [];
  boardShip: any[] = [];
  initial = {
    row: 0,
    col: 0
  };
  lenShip: number = 0;
  positionShip: any[] = [];
  name: string = '';
  level: string = '';
  email: string = '';
  remainigTurns = 0;
  shipPositions = 20;
  finalMessage = 'Loading';
  showBoard = false;
  userHistory: History = {};
  title: string = 'Battleship game';
  constructor(private route: ActivatedRoute, private firebaseFirestoreService: FirebaseFirestoreService,) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.name = params['name'];
        this.level = params['level'];
        this.email = params['email'];
        this.level === '3' ? this.remainigTurns = 50 : this.level === '2' ? this.remainigTurns = 100 : this.remainigTurns = -1
      }
      );
    this.createDashboard();
  }

  createDashboard() {
    this.board = [];
    for (var i: number = 0; i < 10; i++) {
      this.board[i] = [];
      for (var j: number = 0; j < 10; j++) {
        this.board[i][j] = { used: false, value: 0, status: '' };
      }
    }
    this.showBoard = true;
    this.createShips();
  }
  createShips() {
    let listShipCreate = [{ tipo: 1, len: 4, number: 1 }, { tipo: 2, len: 3, number: 2 }, { tipo: 3, len: 2, number: 3 }, { tipo: 4, len: 1, number: 4 }];
    listShipCreate.forEach(element => {
      for (var i: number = 0; i < element.number; i++) {
        this.lenShip = element.len;
        this.createShipType();
      }
    });
  }

  createShipType() {
    this.initial = this.initialPosition(10);
    this.selectDirection();
  }

  initialPosition(len: number): any {
    let initial = {
      row: 0,
      col: 0
    };
    len = len - 1;
    let ranRow = this.getRandomInt(0, len),
      ranCol = this.getRandomInt(0, len);
    if (this.board[ranRow][ranCol].value == 1) {
      return this.initialPosition(len);
    } else {
      initial.row = ranRow;
      initial.col = ranCol;
      return initial
    }
  }

  selectDirection() {
    let listShipCreate = [0, 1, 2, 3];
    this.getRandonDirection(listShipCreate);
  }

  getRandonDirection(listShipCreate: any[]) {
    let directionIndex = this.getRandomInt(0, listShipCreate.length - 1);
    listShipCreate.splice(directionIndex, 1);
    let validation: boolean;
    validation = this.validatePosition(directionIndex);
    validation === false ? this.getRandonDirection(listShipCreate) : this.addShipBoard();
  }

  validatePosition(dir: number): boolean {
    if (dir === 0) {
      if (this.initial.col + this.lenShip > 9 && this.initial.col >= 9) {
        return false;
      } else {
        return this.validateShipPosition(dir);
      }
    } else if (dir === 1) {
      if (this.initial.col - this.lenShip < 0) {
        return false;
      } else {
        return this.validateShipPosition(dir);
      }
    } else if (dir === 2) {
      if (this.initial.row - this.lenShip > 9 && this.initial.row >= 9) {
        return false;
      } else {
        return this.validateShipPosition(dir);
      }
    } else if (dir === 3) {
      if (this.initial.row - this.lenShip < 0) {
        return false;
      } else {
        return this.validateShipPosition(dir);
      }
    }

    return false
  }

  validateShipPosition(dir: number): boolean {
    this.positionShip.push(this.initial);
    let validation: boolean = true;
    let row = this.initial.row;
    let col = this.initial.col;
    for (var i: number = 1; i < this.lenShip; i++) {
      dir === 0 ? col = this.initial.col + i : dir === 1 ? col = this.initial.col - i : col = this.initial.col;
      dir === 2 ? row = this.initial.row + i : dir === 3 ? row = this.initial.row - i : row = this.initial.row;
      if (col === 10 || row === 10) { break }
      if (this.board[row][col].value == 1) {
        validation = false;
        break;
      } else {
        let coors = {
          row: row,
          col: col
        }
        this.positionShip.push(coors);
      }
    }
    return validation;
  }

  addShipBoard() {
    this.positionShip.forEach(element => {
      this.board[element.row][element.col].value = 1
    });
    this.positionShip = [];
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  selectCell(x: number, y: number) {
    if (this.board[x][y].used === false) {
      this.board[x][y].used = true;
      if (this.board[x][y].value === 1) {
        this.shipPositions = this.shipPositions - 1;
      }
      this.remainigTurns = this.remainigTurns - 1;
      this.validateStatusGame();
    }
  }

  validateStatusGame() {
    if (this.shipPositions === 0) {
      this.finalMessage = 'You have won the game.';
      this.showBoard = false;
      this.saveHistory();
    } else if (this.shipPositions > 0 && this.remainigTurns === 0) {
      this.finalMessage = 'You lost the game.';
      this.showBoard = false;
      this.saveHistory();
    }
  }

  reload() {
    this.shipPositions = 20;
    this.level === '3' ? this.remainigTurns = 50 : this.level === '2' ? this.remainigTurns = 100 : this.remainigTurns = -1
    this.createDashboard();
  }

  saveHistory() {
    this.userHistory!.email = this.email;
    this.userHistory!.name = this.name;
    this.userHistory!.result = JSON.stringify(this.board);
    this.userHistory!.shipPosition = this.shipPositions;
    this.userHistory!.state = this.finalMessage;
    this.userHistory!.date = new Date().toLocaleString();
    this.firebaseFirestoreService.newUserGame(this.userHistory!);
  }



}
