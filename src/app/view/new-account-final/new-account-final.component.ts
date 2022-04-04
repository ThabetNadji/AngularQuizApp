import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { teacher } from 'src/app/Model/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-account-final',
  templateUrl: './new-account-final.component.html',
  styleUrls: ['./new-account-final.component.css']
})
export class NewAccountFinalComponent implements OnInit {
  registerForm : FormGroup = new FormGroup({});
  _teacher: teacher = new teacher();
  phoneNumber : string;
  constructor(private router: Router,private formBuilder:FormBuilder,private teacherServices:TeacherService ) { 
    this.phoneNumber = this.router.getCurrentNavigation()?.extras.state?._phoneNumber;
  }
  
  // you will need it for the validation template form
  get firstName(): any { return this.registerForm.get('firstName');}
  get lastName(): any { return this.registerForm.get('lastName');}
  get userPassword(): any { return this.registerForm.get('userPassword');}
  get userPasswordConf(): any { return this.registerForm.get('userPasswordConf');}
  get module(): any { return this.registerForm.get('module');}

  ngOnInit(): void {
    /*if(this.phoneNumber==null){
      console.log('permission deny ...');
      this.router.navigate(['/newAccount']);
      alert('permission deny ...');
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }*/
    this.registerForm=this.formBuilder.group({
      firstName : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
      lastName : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
      module : new FormControl('',[Validators.required]),
      userPassword : new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(15)]),
      userPasswordConf : new FormControl('',[Validators.required])
    });
  }

  addNewTeacher(){
    if(this.registerForm.value.userPassword == this.registerForm.value.userPasswordConf){
      // initialisation teacher
      this._teacher.teacherSave(this.registerForm.value.firstName, this.registerForm.value.lastName,
                          this.phoneNumber, this.registerForm.value.module, this.registerForm.value.userPassword);
      // call teacher services 
      this.teacherServices.addNewTeacher(this._teacher);
      // redirect to last the page 
      this.router.navigate(['/endRegistration']);
    }else{
      alert('password and passwordConfirmation dont match');
    }
  }

}
