import { TeacherService } from 'src/app/services/teacher.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  //teacherSession = JSON.parse(sessionStorage.getItem('teacherSession')!);

  isLogin: boolean = false;
  firstName:string='';
  lastName:string='';
  constructor(private router: Router, private _teacher: TeacherService) {}

  ngOnInit(): void {
   
}

  loginState(){
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
