import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Quiz{
  localNascimento: string;
  mora: string;
  nascimento: string;
  sexo: string;
  email: string;
  disciplinaPreferida: string;
  gostaLer: boolean;
  redeSocial: string;
  planosFuturos: string;
  conheceLCC: boolean;
  gostaTecnologia: boolean;
  nomeAluno:string;
  nomeEscola:string;
  userUid:string;
}

@Injectable()
export class QuizServiceProvider {
  
  userUid:any;

  constructor(private afAuth: AngularFireAuth,
    private afStore:AngularFirestore){
    this.getUid();
  }
  
  public save( question:any ) { 
    const quizAdd: Quiz = {
      localNascimento: question.one,
      mora: question.two,
      disciplinaPreferida: question.three,
      gostaLer: question.four,
      redeSocial: question.five,
      planosFuturos: question.six,
      conheceLCC: question.seven,
      gostaTecnologia: question.eight,
      nascimento: question.studentBirthday,
      sexo: question.studentSex,
      nomeAluno: question.studentName,
      nomeEscola:question.schoolName,
      userUid: question.user,
      email: question.studentEmail
    };
    
    return this.afStore.collection<any>('quiz')
      .add(quizAdd)
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
