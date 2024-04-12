import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackComponent } from './back/back.component';
import { FrontComponent } from './front/front.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './User/add-user/add-user.component';
import { ProfileComponent } from './User/profile/profile.component';
import { PartnerComponent } from './User/partner/partner.component';


const routes: Routes = [
  {path:'front', component:FrontComponent},
  {path:'', redirectTo:'/front', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'back', component:BackComponent},
  {path:'adduser', component:AddUserComponent}, 
  {path:'profile', component:ProfileComponent}, 
  {path:'partner', component:PartnerComponent}, 


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
