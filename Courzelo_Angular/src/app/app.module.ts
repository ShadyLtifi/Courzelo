import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackComponent } from './back/back.component';
import { FrontComponent } from './front/front.component';

import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HeadderrComponent } from './headderr/headderr.component';

import { HttpClientModule } from '@angular/common/http';
import { ContenuComponent } from './contenu/contenu.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllClassComponent } from './Class/all-class/all-class.component';
import { AddClassComponent } from './Class/add-class/add-class.component';
import { AddCommentComponent } from './Comment/add-comment/add-comment.component';
import { AllCommentComponent } from './Comment/all-comment/all-comment.component';
import { AllCourseComponent } from './Course/all-course/all-course.component';
import { AddCourseComponent } from './Course/add-course/add-course.component';

import { AllLessonComponent } from './Lesson/all-lesson/all-lesson.component';
import { AddLessonComponent } from './Lesson/add-lesson/add-lesson.component';
import { AddModuleComponent } from './Module/add-module/add-module.component';
import { AllModuleComponent } from './Module/all-module/all-module.component';
import { PublicationComponent } from './Publication/publication/publication.component';
import { AddPublicationComponent } from './Publication/add-publication/add-publication.component';
import { AddProgramComponent } from './Program/add-program/add-program.component';
import { AllProgramComponent } from './Program/all-program/all-program.component';
import { UpdateClassComponent } from './Class/update-class/update-class.component';
import { TesteComponent } from './teste/teste.component';
import { DetailClassComponent } from './Class/detail-class/detail-class.component';





@NgModule({
  declarations: [
    AppComponent,
    BackComponent,
    FrontComponent,
 
    FooterComponent,
    LoginComponent,
    HeadderrComponent,

    ContenuComponent,
  AllClassComponent,
   AddClassComponent,
   AddCommentComponent,
   AllCommentComponent,

   AllClassComponent,
     AllCourseComponent,
     AddCourseComponent,

     AllLessonComponent,
     AddLessonComponent,
     AddModuleComponent,
     AllModuleComponent,
     PublicationComponent,
     AddPublicationComponent,
     AddProgramComponent,
     AllProgramComponent,
     UpdateClassComponent,
     TesteComponent,
     DetailClassComponent
  
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
