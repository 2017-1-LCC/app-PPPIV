import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { QuizServiceProvider } from '../../providers/quiz-service/quiz-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
        onequestion: ['', [Validators.required]], 
        twoquestion: ['', [Validators.required]],
        threequestion: ['', [Validators.required]], 
        fourquestion: ['', [Validators.required]],
        fivequestion: ['', [Validators.required]], 
        sixquestion: ['', [Validators.required]],
        sevenquestion: ['', [Validators.required]], 
        eightquestion: ['', [Validators.required]]
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

  public saveQuiz(){
    this.quizServiceProvider.save(this.question);
    this.loginServiceProvider.toastCall("Dados Salvos Com Sucesso");
    this.quizForm.reset();
  }

}
