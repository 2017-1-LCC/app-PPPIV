import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Quiz{
  uid:string;
  nascimento: string;
  mora: string;
  disciplinaPreferida: string;
  gostaLer: boolean;
  redeSocial: string;
  planosFuturos: string;
  conheceLCC: boolean;
  gostaTecnologia: boolean;
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
      nascimento: question.one,
      mora: question.two,
      disciplinaPreferida: question.three,
      gostaLer: question.four,
      redeSocial: question.five,
      planosFuturos: question.six,
      conheceLCC: question.seven,
      gostaTecnologia: question.eight
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
