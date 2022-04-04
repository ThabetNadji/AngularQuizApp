import { questionImpl } from './../../Model/questionImpl';
import { question } from './../../Model/question';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { QuestionServicesService } from 'src/app/services/question-services.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  progressBarValue=10;
  validateVar:boolean=false;
  questionNumber: number =1;
  questionForm: FormGroup = new FormGroup({});
  question_: questionImpl = new questionImpl();
  closeResult: string | undefined;// model
  constructor(private router:Router, private formBuilder:FormBuilder,private questionServicesService:QuestionServicesService,private modalService: NgbModal) { }

  ngOnInit(): void {
    
    if(this.questionServicesService.getTrimester() ==">" || this.questionServicesService.getModule() ==">"){
      console.log('permission deny ...');
      this.router.navigate(['/index']);
      alert('permission deny ...');
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
    this.questionForm=this.formBuilder.group({
      questionText : new FormControl('',[Validators.required]),
      rep1: new FormControl('',[Validators.required]),
      rep2: new FormControl('',[Validators.required]),
      rep3: new FormControl('',[Validators.required]),
      rep4: new FormControl('',[Validators.required]),
      correctRepNum: new FormControl('',[Validators.required]),
  });
  }

  getQuestionFormValue() : void{
    // initialize question variable
    this.question_.addQuestionValue(this.questionForm.value.questionText,this.questionForm.value.rep1,this.questionForm.value.rep2,this.questionForm.value.rep3,this.questionForm.value.rep4,this.questionForm.value.correctRepNum);
    
    // add question to ListQuestion
    this.questionServicesService.addToListQuestion(this.question_);
    
    // rest questionFrom
    this.questionForm.get("questionText")?.reset();
    this.questionForm.get("rep1")?.reset();
    this.questionForm.get("rep2")?.reset();
    this.questionForm.get("rep3")?.reset();
    this.questionForm.get("rep4")?.reset();
    this.questionForm.get("correctRepNum")?.reset();
    
    //update progressBar
    this.progressBarValue=this.progressBarValue+10;

    // update questionNumber
    this.questionNumber=this.questionNumber+1;

    if(this.questionNumber==10){
      this.validateVar=true;
    }
    
    if(this.questionNumber==11){
      //call API 
      this.questionServicesService.sendQuestion();
    }
  }

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