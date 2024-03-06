import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import routes from './app.routing';
import { BackComponent } from './back/back.component';
import { FrontComponent } from './front/front.component';

import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AddClassComponent } from './Class/add-class/add-class.component';
import { AllClassComponent } from './Class/all-class/all-class.component';
import { DetailClassComponent } from './Class/detail-class/detail-class.component';
import { UpdateClassComponent } from './Class/update-class/update-class.component';
import { AddCommentComponent } from './Comment/add-comment/add-comment.component';
import { AllCommentComponent } from './Comment/all-comment/all-comment.component';
import { DetailCommentComponent } from './Comment/detail-comment/detail-comment.component';
import { UpdateCommentComponent } from './Comment/update-comment/update-comment.component';
import { AddCourseComponent } from './Course/add-course/add-course.component';
import { AllCourseComponent } from './Course/all-course/all-course.component';
import { DetailCourseComponent } from './Course/detail-course/detail-course.component';
import { UpdateCourseComponent } from './Course/update-course/update-course.component';
import { AddLessonComponent } from './Lesson/add-lesson/add-lesson.component';
import { AllLessonComponent } from './Lesson/all-lesson/all-lesson.component';
import { DetailLessonComponent } from './Lesson/detail-lesson/detail-lesson.component';
import { UpdateLessonComponent } from './Lesson/update-lesson/update-lesson.component';
import { AddModuleComponent } from './Module/add-module/add-module.component';
import { AllModuleComponent } from './Module/all-module/all-module.component';
import { DetailModuleComponent } from './Module/detail-module/detail-module.component';
import { UpdateModuleComponent } from './Module/update-module/update-module.component';
import { AddProgramComponent } from './Program/add-program/add-program.component';
import { AllProgramComponent } from './Program/all-program/all-program.component';
import { DetailProgramComponent } from './Program/detail-program/detail-program.component';
import { UpdateProgramComponent } from './Program/update-program/update-program.component';
import { AddPublicationComponent } from './Publication/add-publication/add-publication.component';
import { DetailPublicationComponent } from './Publication/detail-publication/detail-publication.component';
import { PublicationComponent } from './Publication/publication/publication.component';
import { UpdatePublicationComponent } from './Publication/update-publication/update-publication.component';
import { HeadderrComponent } from './headderr/headderr.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnseignantComponent } from './Enseignant/enseignant/enseignant.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddLessonEnseigComponent } from './Enseignant/add-lesson-enseig/add-lesson-enseig.component';


@NgModule({
  declarations: [
    AppComponent,
    BackComponent,
    FrontComponent,
 
    FooterComponent,
    LoginComponent,
    HeadderrComponent,

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
     
     DetailClassComponent,
     UpdateProgramComponent,
     DetailProgramComponent,
     DetailPublicationComponent,
     UpdatePublicationComponent,
     DetailModuleComponent,
     UpdateModuleComponent,
     UpdateLessonComponent,
     DetailLessonComponent,
     DetailCourseComponent,
     UpdateCourseComponent,
     DetailCommentComponent,
     UpdateCommentComponent,
     EnseignantComponent,
     AddLessonEnseigComponent
  

  ],
  imports: [
    BrowserModule,[RouterModule.forRoot(routes),],
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
