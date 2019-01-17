import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { QuizServiceProvider } from '../../providers/quiz-service/quiz-service';
import { FormGroup, FormBuilder } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

  public question: any = {};
  quizForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loginServiceProvider: LoginServiceProvider,
    public quizServiceProvider: QuizServiceProvider
    ) {
      this.quizForm = formBuilder.group({
        onequestion: [], 
        twoquestion: [],
        threequestion: [], 
        fourquestion: [],
        fivequestion: [], 
        sixquestion: [],
        sevenquestion: [], 
        eightquestion: []
      });
  }

  public logout(){
    this.loginServiceProvider.logout().then( success => {
      this.navCtrl.setRoot("LoginPage");
    }).catch(error => {
      let message:string = error.message;
      this.loginServiceProvider.toastCall(message);
    });
  }

  saveQuiz(){
    this.quizServiceProvider.save(this.question);
  }

}
