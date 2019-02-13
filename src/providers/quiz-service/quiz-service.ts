import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Quiz{
  uid: string;
  userUid:string;
  nomeAluno:string;
  email: string;
  sexo: string;
  nascimento: string;
  localNascimento: string;
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
    let uidQuiz: string = this.afStore.createId();
    let ref = this.afStore.collection('quiz').doc(uidQuiz);
    let quizAdd: Quiz = {
      uid: uidQuiz,
      userUid: question.user,
      nomeAluno: question.studentName,
      email: question.studentEmail,
      nascimento: question.studentBirthday,
      sexo: question.studentSex, 
      localNascimento: question.one,
      mora: question.two,
      disciplinaPreferida: question.three,
      gostaLer: question.four,
      redeSocial: question.five,
      planosFuturos: question.six,
      conheceLCC: question.seven,
      gostaTecnologia: question.eight 
    };
    
    return ref.set(quizAdd);
  }

  public list(uid) {
    return this.afStore.collection('quiz', ref => ref.where('userUid','==',uid)).valueChanges();
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
