import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let board: any[][] = [[{ used: false, value: 0, status: '' }, { used: false, value: 0, status: '' }, { used: false, value: 0, status: '' }],
  [{ used: false, value: 0, status: '' }, { used: false, value: 0, status: '' }, { used: false, value: 0, status: '' }],
  [{ used: false, value: 1, status: '' }, { used: false, value: 1, status: '' }, { used: false, value: 1, status: '' }]];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        RouterTestingModule
      ],
      declarations: [BoardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Battleship game'`, () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Battleship game');
  });

  it(`if shipPositions is  0  should hide board and show message 'You have won the game.'`, () => {
    component.shipPositions = 0;
    component.validateStatusGame();
    expect(component.finalMessage).toEqual('You have won the game.');
    expect(component.showBoard).toBeFalse();
  })

  it(`if shipPositions is > 0  and remainigTurns is 0  should hide board and show message 'You lost the game.'`, () => {
    component.shipPositions = 2;
    component.remainigTurns = 0;
    component.validateStatusGame();
    expect(component.finalMessage).toEqual('You lost the game.');
    expect(component.showBoard).toBeFalse();
  })

  it(`if user click reload() if level is 3 'remainigTurns should be 50'`, () => {
    component.level = '3';
    component.reload();
    expect(component.remainigTurns).toEqual(50);
  })

  it(`if user click reload() if level is 2 'remainigTurns should be 100'`, () => {
    component.level = '2';
    component.reload();
    expect(component.remainigTurns).toEqual(100);
  })

  it(`if user click selectCell() if board position.used is false  and  position.value is 1'position.used should be change to true and subtract 2 from  remainigTurns'`, () => {
    component.shipPositions = 9;
    component.remainigTurns = 10;
    component.board = board;
    component.selectCell(2, 2);
    expect(component.shipPositions).toEqual(8);
    expect(component.remainigTurns).toEqual(9);
    expect(component.board[2][2].used).toBeTrue;
  })


});
