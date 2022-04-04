import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './view/main-content/main-content.component';
import { QuestionsComponent } from './view/questions/questions.component';
import { LoginComponent } from './view/login/login.component';
import { NewAccountComponent } from './view/new-account/new-account.component';
import { NewAccountFinalComponent } from './view/new-account-final/new-account-final.component';
import { CodeComponent } from './view/code/code.component';
import { NewAccountLastPageComponent } from './view/new-account-last-page/new-account-last-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'login'},
  {path:'index', component: MainContentComponent},
  {path:'Questions', component: QuestionsComponent}, 
  {path:'newAccount', component: NewAccountComponent}, 
  {path:'login', component: LoginComponent}, 
  {path:'code', component: CodeComponent},  
  {path:'endRegistration', component: NewAccountLastPageComponent},
  {path:'NewAccountFinalStep', component: NewAccountFinalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
