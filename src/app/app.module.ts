import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainContentComponent } from './view/main-content/main-content.component';
import { FooterComponent } from './view/footer/footer.component';
import { NavBarComponent } from './view/nav-bar/nav-bar.component';
import { QuestionsComponent } from './view/questions/questions.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RightBarComponent } from './view/right-bar/right-bar.component';
import { LeftBarComponent } from './view/left-bar/left-bar.component';
import { HttpClientModule } from  '@angular/common/http';
import { LoginComponent } from './view/login/login.component';
import { NewAccountComponent } from './view/new-account/new-account.component';
import { NgOtpInputModule } from  'ng-otp-input';

// Firebase services + environment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { CodeComponent } from './view/code/code.component';
import { NewAccountFinalComponent } from './view/new-account-final/new-account-final.component';
import { NewAccountLastPageComponent } from './view/new-account-last-page/new-account-last-page.component';


@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    FooterComponent,
    NavBarComponent,
    QuestionsComponent,
    RightBarComponent,
    LeftBarComponent,
    LoginComponent,
    NewAccountComponent,
    CodeComponent,
    NewAccountFinalComponent,
    NewAccountLastPageComponent,
  ],
  imports: [
    BrowserModule,RouterModule,AppRoutingModule,ReactiveFormsModule,HttpClientModule,NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgOtpInputModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }