import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { teacher } from '../Model/teacher';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  [x: string]: any;
  phoneNumber:string="/?";
  private UrlPost = '';
  constructor(private httpClient: HttpClient) {}
  _response: string = ' _ ';
  publicUrl:string ='https://springquizappapi-production.up.railway.app/';
  publicUrl2:string ='https://quizgamedz-production.up.railway.app/';
  //String railwaylURL_2 = 'https://quizgamedz-production.up.railway.app/';
  //publicUrl :string ='http://localhost:8080/';

  
  
  // API
  addNewTeacher(_teacher: teacher): void {
    
    this.UrlPost = this.publicUrl+'addNewTeacher/';
    try {
      console.log('sending request to ... ' + this.UrlPost);
      this.httpClient
        .post<teacher>(this.UrlPost, _teacher, { responseType: 'json' })
        .subscribe(
          (response) => {
            console.log('resp log ...' + response);
          },
          (error) => {
            console.log('error log ...' + error);
          }
        );
    } catch (Exception) {
      console.log(Exception);
    }
  }

  isNumberTeacherExist(phoneNumber: string): any {
    this.UrlPost = this.publicUrl+'isNumberTeacherExist/' + phoneNumber;
    try {
      console.log('sending_request_to ... ' + this.UrlPost);
      return this.httpClient.get(this.UrlPost, { responseType: 'text' });
    } catch (Exception) {
      return (this._response = '_error');
    }
  }

  loginTeacher(phoneNumber: string, password: string): any {
   
    console.log('url uses => '+this.UrlPost);
    this.UrlPost = this.publicUrl+'teacherLogin/';
    try {
      return this.httpClient.post(
        this.UrlPost,
        {
          phoneNumber: phoneNumber,
          password: password,
        },
        { responseType: 'json' }
      );
    } catch (Exception) {
      //console.log(Exception.message);
      return false;
    }
  }

  // normal function
  setPhoneNumber(phoneNum:string){
    this.phoneNumber=phoneNum;
  }

  // normal function
  getPhoneNumber(){
    return this.phoneNumber;
  }

}
