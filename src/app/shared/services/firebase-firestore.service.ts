import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Level } from "../models/levels";
import { History } from "../models/history";

@Injectable({
    providedIn: 'root'
})

export class FirebaseFirestoreService {

    constructor(private firestore: AngularFirestore) {
    }

    getLevels() {
        return this.firestore.collection<Level>('levels').valueChanges();
    }

    getUserHistory(email: string) {
        return this.firestore.collection<History>('UserGame',  ref => ref.where('email', '==', email) ).valueChanges();
    }


    async newUserGame(_history: History) {
        const docRef = this.firestore.collection('UserGame').doc();

        await docRef.set({
            name: _history.name,
            email: _history.email,
            state: _history.state,
            result: _history.result,
            shipPosition: _history.shipPosition,
            date: _history.date
        });
    }

}