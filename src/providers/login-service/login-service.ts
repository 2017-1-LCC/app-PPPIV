import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, NavController } from 'ionic-angular';

@Injectable()
export class LoginServiceProvider {

  constructor( private authFireService: AngularFireAuth, public toastCtrl:ToastController  ){ }

  public login(user: any): Promise<firebase.auth.UserCredential>{
    return this.authFireService.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  public logout(): Promise<void>{
    return this.authFireService.auth.signOut();
  }

  public erromessage(error:any): void{
    let message: string = error;

    switch (message){
      case "auth/invalid-email":{
        message = "O email esta em formato errado.";
        break;
      }

      case "auth/user-not-found":{
        message = "Email errado!";
        break;
      }
      
      case "auth/wrong-password":{
        message = "Senha inválida!";
        break;
      }
      
      case "auth/too-many-requests":{
        message = " Muitas tentativas de login malsucedidas! Tente novamente mais tarde.";
        break;
      }
    }
    this.toastCall(message);
  }

  toastCall(message: string): void{
    let toast = this.toastCtrl.create({
      message: message,
      position: 'top',
      showCloseButton: true,
      closeButtonText: "ok"
    });

    toast.present();
  }
    
}
