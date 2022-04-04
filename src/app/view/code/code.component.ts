import { Component, NgZone, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
  otp!: string;
  verify: any;
  phoneNumber!: string;
  constructor(private router: Router, private ngZone: NgZone) {
    this.phoneNumber = this.router.getCurrentNavigation()?.extras.state?._phoneNumber;
    console.log('navigation value');
    console.log(this.phoneNumber);
  }

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };

  ngOnInit(): void {
    if(this.phoneNumber==null){
      console.log('permission deny ...');
      this.router.navigate(['/newAccount']);
      alert('permission deny ...');
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
    console.log(this.verify);
  }

  onOtpChange(otpCode:any){
    this.otp = otpCode;
  }

  handleClick() {
    console.log(this.otp);
    var credential = firebase.auth.PhoneAuthProvider.credential(
      this.verify,
      this.otp
    );

    console.log(credential);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((response) => {
        console.log(response);
        localStorage.setItem('user_data', JSON.stringify(response));
        this.ngZone.run(() => {
          //this.router.navigate(['/NewAccountFinalStep']);
          this.router.navigate(['/NewAccountFinalStep'], { state: { _phoneNumber: this.phoneNumber } });
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }
}
