import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


export interface Quiz{
  uid:string;
  onequestion: string;
  twoquestion: string;
  threequestion: string;
  fourquestion: boolean;
  fivequestion: string;
  sixquestion: string;
  sevenquestion: boolean;
  eightquestion: boolean;
}

export interface User{
  email:string;  
  name:string;
  uid:string;
}
@Injectable()
export class QuizServiceProvider {
  
  user$:Observable<User>

  constructor(public fireStore:AngularFirestore,
    private fireAuth: AngularFireAuth)
  {  
    this.user$ = this.fireAuth.authState.switchMap(user => (user) ? this.fireStore.doc<User>(`users/${user.uid}`).valueChanges() :Observable.of(null));

  }
  public save( question:any ){
    this.addQuestion(question, this.user$);
  }

  public addQuestion( question:any, user:any ){
    const ref: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);
    const quizAdd: Quiz = {
      uid: "fsdfaf",
      onequestion: question.one,
      twoquestion: question.two,
      threequestion: question.three,
      fourquestion: question.four,
      fivequestion: question.five,
      sixquestion: question.six,
      sevenquestion: question.seven,
      eightquestion: question.eight
    };
    return ref.set(quizAdd);
  }
}
