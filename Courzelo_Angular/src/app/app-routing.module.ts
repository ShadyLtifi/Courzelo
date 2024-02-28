import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackComponent } from './back/back.component';
import { FrontComponent } from './front/front.component';
import { LoginComponent } from './login/login.component';

import { AllClassComponent } from './Class/all-class/all-class.component';
import { AddClassComponent } from './Class/add-class/add-class.component';
import { AddCommentComponent } from './Comment/add-comment/add-comment.component';
import { AllCommentComponent } from './Comment/all-comment/all-comment.component';
import { AddCourseComponent } from './Course/add-course/add-course.component';
import { AllCourseComponent } from './Course/all-course/all-course.component';
import { AddLessonComponent } from './Lesson/add-lesson/add-lesson.component';
import { AllLessonComponent } from './Lesson/all-lesson/all-lesson.component';
import { AllModuleComponent } from './Module/all-module/all-module.component';
import { AddModuleComponent } from './Module/add-module/add-module.component';
import { UpdateClassComponent } from './Class/update-class/update-class.component';
import { TesteComponent } from './teste/teste.component';
import { DetailClassComponent } from './Class/detail-class/detail-class.component';




const routes: Routes = [
  {path:'front', component:FrontComponent},
  {path:'', redirectTo:'/front', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'back', component:BackComponent}, 
  { path: 'classe', component: AllClassComponent },
  { path: 'addClass', component: AddClassComponent },
{path: 'addCourse', component: AddCourseComponent},
{path:'allCourse', component:AllCourseComponent},
  {path:'allComment', component:AllCommentComponent},
  {path:'addLesson', component:AddLessonComponent},
  {path:'allLesson', component:AllLessonComponent},
  {path:'allModule', component:AllModuleComponent},
  {path:'addModule', component:AddModuleComponent},
  {path:'addComment', component:AddCommentComponent},
  { path: 'updateClass/:id', component: UpdateClassComponent },
  {path:'teste',component:TesteComponent},
  { path: 'class-details/:id', component: DetailClassComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
