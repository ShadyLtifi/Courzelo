import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackComponent } from './back/back.component';
import { FrontComponent } from './front/front.component';
import { LoginComponent } from './login/login.component';
import { ClasseComponent } from './classe/classe.component';
import { AddClassComponent } from './add-class/add-class.component';

const routes: Routes = [
  {path:'front', component:FrontComponent},
  {path:'', redirectTo:'/front', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'back', component:BackComponent}, 
    { path: 'classe', component: ClasseComponent },
    { path: 'addClass', component: AddClassComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
