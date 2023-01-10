import { question } from './../Model/question';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionServicesService {
  i:number=0;
  module:string=">";
  trimester:string=">";
  questionList : Array<question>=[];
  publicUrl:string ='https://springquizappapi-production.up.railway.app/';
  //publicUrl:string ='http://localhost:8080/'; //https://heroku-quizapi.herokuapp.com/
  private UrlPost = "";
  constructor(private httpClient: HttpClient) {}

  //API addQuestion
  sendQuestion(): void {
    this.UrlPost=this.publicUrl+'addQuestion/'+this.module+'/'+this.trimester+'/'; 
    try{
      console.log("sending request to ... "+this.UrlPost);
      this.httpClient.post<Array<question>>(this.UrlPost, this.questionList , { responseType: 'json' }).subscribe(  
        (response) => {
          console.log("resp log ..."+response);
        }, 
        (error) => {
          console.log("error log ..."+error);
        }
        );
    }catch(Exception){
      console.log(Exception);
    }
  }

  // normal function
  setModuleAndTrimester(module_:string,trimester_:string): void {
    this.module=module_;
    this.trimester=trimester_;
    console.log("module: -> "+this.module);
    console.log("trimester: -> "+this.trimester);
  }

  // normal function
  getModule(){
    return this.module;
  }

  // normal function
  getTrimester(){
    return this.trimester;
  }
  // normal function
  addToListQuestion(question_:question) :void{
    this.questionList.push({...question_});
    for (let index = 0; index < this.questionList.length; index++) {
      console.log(this.questionList[index]);
    }
    console.log("------------------------");
  }
  
}
