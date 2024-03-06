import { RouterModule, Routes } from '@angular/router';
import { BackComponent } from './back/back.component';
import { FrontComponent } from './front/front.component';
import { LoginComponent } from './login/login.component';


import { NgModule } from '@angular/core';
import { AddClassComponent } from './Class/add-class/add-class.component';
import { AllClassComponent } from './Class/all-class/all-class.component';
import { DetailClassComponent } from './Class/detail-class/detail-class.component';
import { UpdateClassComponent } from './Class/update-class/update-class.component';
import { AddCommentComponent } from './Comment/add-comment/add-comment.component';
import { AllCommentComponent } from './Comment/all-comment/all-comment.component';
import { AddCourseComponent } from './Course/add-course/add-course.component';
import { AllCourseComponent } from './Course/all-course/all-course.component';
import { AddLessonComponent } from './Lesson/add-lesson/add-lesson.component';
import { AllLessonComponent } from './Lesson/all-lesson/all-lesson.component';
import { AddModuleComponent } from './Module/add-module/add-module.component';
import { AllModuleComponent } from './Module/all-module/all-module.component';
import { AddProgramComponent } from './Program/add-program/add-program.component';
import { AllProgramComponent } from './Program/all-program/all-program.component';
import { DetailProgramComponent } from './Program/detail-program/detail-program.component';
import { UpdateProgramComponent } from './Program/update-program/update-program.component';
import { DetailCommentComponent } from './Comment/detail-comment/detail-comment.component';
import { UpdateCommentComponent } from './Comment/update-comment/update-comment.component';
import { UpdateCourseComponent } from './Course/update-course/update-course.component';
import { DetailCourseComponent } from './Course/detail-course/detail-course.component';
import { DetailLessonComponent } from './Lesson/detail-lesson/detail-lesson.component';
import { UpdateLessonComponent } from './Lesson/update-lesson/update-lesson.component';
import { DetailModuleComponent } from './Module/detail-module/detail-module.component';
import { UpdateModuleComponent } from './Module/update-module/update-module.component';
import { EnseignantComponent } from './Enseignant/enseignant/enseignant.component';

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
    { path: 'class-details/:id', component: DetailClassComponent },
    {path:'allProgram',component:AllProgramComponent},
    {path:'addProgram',component:AddProgramComponent},
    { path: 'updateProgram/:id', component: UpdateProgramComponent },
    { path: 'program-details/:id', component: DetailProgramComponent },
    {path: 'comment-details/:id', component:DetailCommentComponent},
    { path: 'updateComment/:id', component: UpdateCommentComponent },
    { path: 'updateCourse/:id', component: UpdateCourseComponent },
    {path: 'course-details/:id', component:DetailCourseComponent},
    {path: 'lesson-details/:id', component:DetailLessonComponent},
    { path: 'updateLesson/:id', component: UpdateLessonComponent },
    {path: 'module-details/:id', component:DetailModuleComponent},
    { path: 'updateModule/:id', component: UpdateModuleComponent },
    {path: 'Users/Enseignant', component:EnseignantComponent}
    


];
NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export default routes;
