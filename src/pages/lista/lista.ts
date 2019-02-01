import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuizServiceProvider } from '../../providers/quiz-service/quiz-service';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { Loading } from '../../providers/util/loading';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  listEntities:any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public quizService: QuizServiceProvider,
    public loginService: LoginServiceProvider,
    public loading: Loading) {

      this.loading.show();

      this.loginService.loggedUser()
        .subscribe(user => {
          if(user) {
            this.quizService.list(user.uid)
              .subscribe(list => {
                this.listEntities = list
                this.loading.hide();
              })
          }else {
            this.loading.hide();
          }
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPage');
  }

}
