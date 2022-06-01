import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FirebaseFirestoreService } from 'src/app/shared/services/firebase-firestore.service';
import { History } from "../../shared/models/history";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  userHistory: History[] = [];
  history$: Observable<History[]> | undefined;
  email: string = '';
  showGame = false;
  game: any[][] = [];  
  subscriptionHistory: Subscription | undefined;
  title: string = 'Battleship game history';
  constructor(private firebaseFirestoreService: FirebaseFirestoreService) { }

  ngOnInit(): void {
    this.getUserHistory();
  }

  getUserHistory() {
    this.email = JSON.parse(localStorage.getItem("email") || '');
    this.history$ = this.firebaseFirestoreService.getUserHistory(this.email).pipe();
    this.subscriptionHistory = this.history$.subscribe(response => {
      this.userHistory = response;
    })
  }

  showGameBoard(game: History){
   this.game = JSON.parse(game.result!);
   this.showGame = true;
  }

  ngOnDestroy() {
		this.subscriptionHistory!.unsubscribe()
  }

}
