import { TeacherService } from 'src/app/services/teacher.service';
import { QuestionServicesService } from 'src/app/services/question-services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-account-last-page',
  templateUrl: './new-account-last-page.component.html',
  styleUrls: ['./new-account-last-page.component.css']
})
export class NewAccountLastPageComponent implements OnInit {

  constructor(private teacherService:TeacherService,private router:Router) { }

  ngOnInit(): void {
    console.log('this is your number ...'+this.teacherService.getPhoneNumber());
    if(this.teacherService.getPhoneNumber()=='/?'){
        console.log('permission deny ...');
        this.router.navigate(['/newAccount']);
        alert('permission deny ...');
        setTimeout(() => {
          window.location.reload();
        }, 5000);
    }
  }

}
