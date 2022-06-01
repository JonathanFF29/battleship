import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Level } from 'src/app/shared/models/levels';
import { environment } from 'src/environments/environment';

import { ConfigComponent } from './config.component';

const levels: Level[][] = [[
  { id:1, name: 'easy', selected: false, value: 0},
  { id:2, name: 'middle', selected: false, value: 100},
  { id:2, name: 'hard', selected: false, value: 50},
]];


describe('ConfigComponent', () => {
  let component: ConfigComponent;
  let fixture: ComponentFixture<ConfigComponent>;
  let formGroup: FormGroup;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule
      ],
      declarations: [ ConfigComponent ],
      providers: [ { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }]
    })
    .compileComponents();
  });

  
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigComponent);
    component = fixture.componentInstance;
    formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required)
    });
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Welcome to Battleship game'`, () => {
    const fixture = TestBed.createComponent(ConfigComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Welcome to Battleship game');
  });
});
