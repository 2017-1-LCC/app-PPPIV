import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LoginServiceProvider } from "../../providers/login-service/login-service";
import { QuizServiceProvider } from "../../providers/quiz-service/quiz-service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Loading } from "../../providers/util/loading";

@IonicPage()
@Component({
  selector: "page-quiz",
  templateUrl: "quiz.html"
})
export class QuizPage {
  private question: any = {};
  private quizForm: FormGroup;
  private questionFive = [];
  private userUid:String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loginServiceProvider: LoginServiceProvider,
    public quizServiceProvider: QuizServiceProvider,
    public loading: Loading
  ) {
    
    this.loading.show();

    this.quizForm = formBuilder.group({
      onequestion: ["", [Validators.required]],
      twoquestion: ["", [Validators.required]],
      threequestion: ["", [Validators.required]],
      fourquestion: ["", [Validators.required]],
      fivequestion: ["", [Validators.required]],
      sixquestion: ["", [Validators.required]],
      sevenquestion: ["", [Validators.required]],
      eightquestion: ["", [Validators.required]],
      studentName:["",[Validators.required]],
      schoolName:["",[Validators.required]]
    });

    this.questionFive = [
    { name:"facebook", status: false },
    { name:"Instagram", status: false },
    { name:"Whatsapp", status: false},
    { name:"Nenhuma", status: false }
    ];

    this.loginServiceProvider.loggedUser()
      .subscribe(user => {
        if(user) {
          this.userUid = user.uid
        }
        this.loading.hide();
      })
  }

  public saveQuiz() {
    this.question.user = this.userUid;
    this.question.five = this.questionFive;
    this.quizServiceProvider.save(this.question);
    this.loginServiceProvider.toastCall("Dados Salvos Com Sucesso", "middle");
    this.quizForm.reset();
  }
}
