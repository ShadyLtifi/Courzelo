import { RouterModule, Routes } from '@angular/router';
import { BackComponent } from './back/back.component';
import { FrontComponent } from './front/front.component';
import { LoginComponent } from './login/login.component';


import { NgModule } from '@angular/core';


import { AlleventsComponent } from './Event/allevents/allevents.component';
import { AddEventComponent } from './Event/addevent/addevent.component';
import { ShoweventComponent } from './Event/showevent/showevent.component';
import { AllspeakersComponent } from './Speaker/allspeakers/allspeakers.component';
import { AddspeakerComponent } from './Speaker/addspeaker/addspeaker.component';
import { AllquizzesComponent } from './Quiz/allquizzes/allquizzes.component';
import { AddquizComponent } from './Quiz/addquiz/addquiz.component';
import { AllquestionsComponent } from './Question/allquestions/allquestions.component';
import { AddquestionComponent } from './Question/addquestion/addquestion.component';
import { ShowquestionComponent } from './Question/showquestion/showquestion.component';
import { ShowquizComponent } from './Quiz/showquiz/showquiz.component';
import { ShowspeakerComponent } from './Speaker/showspeaker/showspeaker.component';
import { UpdatespeakerComponent } from './Speaker/updatespeaker/updatespeaker.component';
import { UpdatequizComponent } from './Quiz/updatequiz/updatequiz.component';
import { UpdatequestionComponent } from './Question/updatequestion/updatequestion.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AddclaimComponent } from './Claim/addclaim/addclaim.component';
import { AllclaimsComponent } from './Claim/allclaims/allclaims.component';
import { UpdateeventComponent } from './Event/updateevent/updateevent.component';

const routes: Routes = [
    {path:'front', component:FrontComponent},
  {path:'', redirectTo:'/front', pathMatch:'full'},
  {path:'login', component:LoginComponent},

    {path:'back', component:BackComponent},
    {path:'allevents', component:AlleventsComponent},
    { path: 'addEvent', component: AddEventComponent },
    { path: 'addSpeaker', component: AddspeakerComponent },
    { path: 'allspeakers', component: AllspeakersComponent },
    { path: 'allquizzes', component:AllquizzesComponent },
    { path: 'addQuiz', component: AddquizComponent },
    {path: 'allquestions' , component : AllquestionsComponent},
    {path: 'addQuestion' , component : AddquestionComponent},
    { path: 'updateEvent/:id', component: UpdateeventComponent },
    { path: 'showevent/:id', component: ShoweventComponent },
    { path: 'showquestion/:id', component: ShowquestionComponent },
    { path: 'showquiz/:id', component: ShowquizComponent },
    { path: 'showspeaker/:id', component: ShowspeakerComponent },
    { path: 'updateSpeaker/:id', component:UpdatespeakerComponent },
    { path: 'updateQuiz/:id', component:UpdatequizComponent},
    { path: 'updateQuestion/:id', component:UpdatequestionComponent},
    { path: 'addClaim', component: AddclaimComponent },
    { path: 'allclaims', component: AllclaimsComponent },

    


    

    { path: '**', component:NotfoundComponent},

    



    


];
NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export default routes;
