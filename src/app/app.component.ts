import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, App, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginServiceProvider } from '../providers/login-service/login-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any = "LoginPage";
  user:any = {};
  pages: Array<{ title: string, component: any, active: boolean, icon: string, canAccess: boolean}>;  

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public app: App,
    public menuController: MenuController,
    public events: Events,
    public loginService: LoginServiceProvider) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
    this.listen();
    this.loadMenu();
  }


  private listen() {

    this.events.subscribe('active:menu', () => {
      this.menuController.enable(true, 'menu');
    })

    this.events.subscribe('disable:menu', () => {
      this.menuController.enable(false, 'menu');
    })

    this.loginService.loggedUser()
      .subscribe(result => {
        if(result) {
          this.user = result;
        }
        this.loadMenu();
      }) 
  }

  public openPage(page):void { this.nav.setRoot(page.component) }

  public logout(){
    this.loginService.logout()
      .then(() => {
        this.events.publish('disable:menu');
        this.app.getRootNav().setRoot('LoginPage');
      })
      .catch((err:any) => {
        console.log('logout err: ',err);
      })
  }

  private loadMenu() {
    this.pages = [
      { title:'Lista de Questionários', component:'ListaPage', active: true, icon:'home', canAccess:true },
      { title:'Novo Questionários', component:'QuizPage', active: true, icon:'home', canAccess:true }
    ]
  }

}

