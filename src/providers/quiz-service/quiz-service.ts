import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

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

@Injectable()
export class QuizServiceProvider {
  
  userUid:any;

  constructor(private afAuth: AngularFireAuth,
    private afStore:AngularFirestore){
    this.getUid();
  }
  
  public save( question:any ) { 
    const quizId = this.afStore.createId();
    const quizAdd: Quiz = {
      uid: quizId,
      onequestion: question.one,
      twoquestion: question.two,
      threequestion: question.three,
      fourquestion: question.four,
      fivequestion: question.five,
      sixquestion: question.six,
      sevenquestion: question.seven,
      eightquestion: question.eight
    };
    
    return this.afStore.collection('users').doc(this.userUid).collection<any>('quiz').doc(quizId).set(quizAdd);
  }

  private getUid(){
    this.afAuth.authState.subscribe(user => {
      if (!user){
        this.userUid = null;
        return;
      }
      this.userUid = user.uid;
    })
  }

}
