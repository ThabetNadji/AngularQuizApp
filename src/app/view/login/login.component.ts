import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { teacher } from 'src/app/Model/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  _teacher: teacher= new teacher();
  constructor(
    
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private router:Router
  ) {}

  get phoneNumber() :any{return this.loginForm.get('phoneNumber');}
  get userPassword() :any{return this.loginForm.get('userPassword');}

    // you will need it for the validation template form
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      phoneNumber: new FormControl('',[Validators.required,Validators.minLength(13),Validators.maxLength(13)]),
      userPassword: new FormControl('',[Validators.required]),
    });
  }

  login() {
    //print('login logic ...');
    this.teacherService
      .loginTeacher(
        this.loginForm.value.phoneNumber,
        this.loginForm.value.userPassword
      )
      .subscribe(
        (rep: teacher) => {
          this._teacher = rep;
          if (this._teacher.firstName == '_') {
            //  wrong password
            alert('phone number or password is wrong');
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          } else {
            if (this._teacher.firstName == '/') {
              //  phone number doe's not exist
              alert('account does not exist');
              setTimeout(() => {
                window.location.reload();
              }, 5000);
            } else {
              if (this._teacher.firstName == '?') {
                // something went wrong in the serve
                alert('something went wrong in the serve, try later ....');
                setTimeout(() => {
                  window.location.reload();
                }, 5000);
              } else {
                if (this._teacher.activated == false) {
                  // account dont activated
                  alert('your account is not activated yet');
                  setTimeout(() => {
                    window.location.reload();
                  }, 5000);
                } else {
                  if (this._teacher.activated == true) {
                    // login success
                    this.router.navigate(['/index']);
                    // create new session 
                    sessionStorage.setItem('teacherSession', JSON.stringify(this._teacher));
                  }
                }
              }
            }
          }
        },
        (error: any) => {
          console.log('log error ' + error);
          alert('something went wrong in the serve, try later ...');
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
      );
  }
}
