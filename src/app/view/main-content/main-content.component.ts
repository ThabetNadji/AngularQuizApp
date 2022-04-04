import { TeacherService } from 'src/app/services/teacher.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { teacher } from 'src/app/Model/teacher';
import { QuestionServicesService } from 'src/app/services/question-services.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  closeResult: string | undefined;// model
  isLogin:boolean =false;
  _teacher :teacher = new teacher();
  teacherSession = JSON.parse(sessionStorage.getItem('teacherSession')!);
  firstName = this.teacherSession.firstName;
  lastName = this.teacherSession.lastName;
  
  moduleTrimForm: FormGroup = new FormGroup({});
  constructor(private router:Router,private modalService: NgbModal,private _teacherService:TeacherService, private formBuilder:FormBuilder, private questionServicesService:QuestionServicesService) { }
  progressBarValue=20;
  ngOnInit(): void {
    this.moduleTrimForm= this.formBuilder.group({
      module : new FormControl('',[Validators.required]),
      trimester : new FormControl('',[Validators.required]),
    }); 

    // security option
    if(!(JSON.parse(sessionStorage.getItem('teacherSession')!))){
      console.log('permission deny ...');
      this.router.navigate(['/index']);
      alert('permission deny ...');
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      //return;
    }
   
    if((JSON.parse(sessionStorage.getItem('teacherSession')!))){
      console.log((JSON.parse(sessionStorage.getItem('teacherSession')!)));
      console.log('----')
      this.isLogin=true;
    }
  }

  getModuleAndTrimester() :void {
    this.questionServicesService.setModuleAndTrimester(this.moduleTrimForm.value.module,this.moduleTrimForm.value.trimester);
  }

  logOut(){
    sessionStorage.clear();
  }

  // modal
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
      );
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
