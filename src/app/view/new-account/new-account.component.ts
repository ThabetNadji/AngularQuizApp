import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, NgZone, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

var config ={
    apiKey: "AIzaSyCH4rvUIVIuO-n4Y-zbLherwyGdZTZDI8Y",
    authDomain: "myeduappse.firebaseapp.com",
    projectId: "myeduappse",
    storageBucket: "myeduappse.appspot.com",
    messagingSenderId: "207003889011",
    appId: "1:207003889011:web:82fe086dbd39ccc1bba906",
    measurementId: "G-3LYBZE3GBZ"
}

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  phoneNumber : any ="";
  reCaptchaVerifier!: any;  
  phoneNumberVerification! : string;
  constructor(private router: Router,private ngZone: NgZone,private teacherServices:TeacherService) { }

  ngOnInit() {
   firebase.initializeApp(config);
  }

  onKeydown(event:any) :any{
    if (event.keyCode === 32 ) {
      return false;
    }
  }

  getOTP(){
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier( 
      'sign-in-button',
      {
        size: 'invisible',
      }
    );
    firebase
      .auth()
      .signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier) 
      .then((confirmationResult) => {
        localStorage.setItem(
          'verificationId',
          JSON.stringify(confirmationResult.verificationId),
        );
        this.ngZone.run(() => {
          //this.router.navigate(['/code']);
          // verified if the number is already exist or not 
           this.teacherServices.isNumberTeacherExist(this.phoneNumber).subscribe(  
            (response : string) => {
             if(response == 'isExist'){
              alert('this phone number that you want to register with is already exist, try with another one');
              setTimeout(() => {
                window.location.reload();
              }, 5000);
             }else{
               if(response =='_error'){
                alert('something went wrong in the serve, try later');
                setTimeout(() => {
                  window.location.reload();
                }, 5000);
               }else{
                 if(response =='notExist'){
                   this.teacherServices.setPhoneNumber(this.phoneNumber);
                  this.router.navigate(['/code'], { state: { _phoneNumber: this.phoneNumber } });
                 }
               }
             }
            }, 
            (error:any) => {
              alert('something went wrong in the serve, try later');
                setTimeout(() => {
                  window.location.reload();
                }, 5000);
            }
            );
        });
      })
      .catch((error) => {
        console.log(error.message);
        console.log('sms not sent');
        alert(error.message);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      });
  }

}
