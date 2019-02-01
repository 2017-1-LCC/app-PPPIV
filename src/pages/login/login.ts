import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Loading } from '../../providers/util/loading';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loginServiceProvider: LoginServiceProvider,
    public formBuilder: FormBuilder,
    public events: Events,
    public loading: Loading) {

    this.events.publish('disable:menu');
    
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

    this.loginServiceProvider.loggedUser()
      .subscribe(user => {
        if(user) {
          this.events.publish('active:menu');
          this.navCtrl.setRoot("ListaPage");
        }
      })
  }

  public login() {
    this.loading.show();

    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.loginServiceProvider.login(user)
      .then(authData => {
        this.loading.hide();
        this.events.publish('active:menu');
        this.navCtrl.setRoot("ListaPage");
      }).catch(error => {
        this.loading.hide();
        this.events.publish('disable:menu');
        this.loginServiceProvider.erromessage(error.code);
      });

  }


}
