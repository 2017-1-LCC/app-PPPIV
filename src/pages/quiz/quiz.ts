import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';


@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loginServiceProvider:LoginServiceProvider) {
  }
  
  public logout(){
    this.loginServiceProvider.logout().then( success =>{
      this.navCtrl.setRoot("LoginPage");
    }).catch(error =>{
      let message:string = error.message;
      this.loginServiceProvider.toastCall(message);
    });
  }

}
