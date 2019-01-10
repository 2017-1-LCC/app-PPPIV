import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class QuizServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello QuizServiceProvider Provider');
  }

}
