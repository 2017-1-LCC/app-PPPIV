import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public loading:Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl:AlertController,
    public loginServiceProvider: LoginServiceProvider,
    public formBuilder: FormBuilder)
  {
    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required])
      ],
      password: [
        '',
        Validators.compose([Validators.required])
      ]
    });
  }

  public login(){
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.loginServiceProvider.login(user).then( authData => {
      this.navCtrl.setRoot("QuizPage");
    }).catch( error => {
      console.log(error);
      this.loginServiceProvider.erromessage(error.code);
    });

  }


}
