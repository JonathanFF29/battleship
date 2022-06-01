import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { Level } from 'src/app/shared/models/levels';
import { FirebaseFirestoreService } from 'src/app/shared/services/firebase-firestore.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  levels$: Observable<Level[]> | undefined;
  levels: Level[] = [] ;
  configGroup!: FormGroup;
  levelSelected: Level | undefined;
  title: string = 'Welcome to Battleship game';
  constructor(private firebaseFirestoreService: FirebaseFirestoreService,
    private router: Router
    ) { }

  ngOnInit(): void {
   this.uploadLevel();
   this.createFormGroup();
  }

  uploadLevel() {
   this.levels$ =  this.firebaseFirestoreService.getLevels().pipe();
   this.levels$.subscribe(response => {
       this.levels = response;
   })
  }

  createFormGroup(){
    this.configGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
    });
  }

  radioChecked(id: any, i: any, level: Level){
    this.levelSelected = level;
    this.levels.map(item=>{
          if(item.id !== id){ 
            item.selected = false;
         }else{
          item.selected = true;
         }
    })
  }

  submitConfig(){
    this.configGroup.controls['level'].setValue(this.levelSelected!.id);
    localStorage.setItem("email", JSON.stringify(this.configGroup.value.email)); 
    this.router.navigate(['board'], {queryParams: { email:  this.configGroup.value.email, name: this.configGroup.value.name, level:this.configGroup.value.level }});
  }

 
}
