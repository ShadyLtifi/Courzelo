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
import { DetailCommentComponent } from './Comment/detail-comment/detail-comment.component';
import { UpdateCommentComponent } from './Comment/update-comment/update-comment.component';
import { AddPublicationComponent } from './Publication/add-publication/add-publication.component';
import { DetailPublicationComponent } from './Publication/detail-publication/detail-publication.component';
import { PublicationComponent } from './Publication/publication/publication.component';
import { UpdatePublicationComponent } from './Publication/update-publication/update-publication.component';
import { HeadderrComponent } from './headderr/headderr.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEventComponent } from './Event/addevent/addevent.component';
import { AlleventsComponent } from './Event/allevents/allevents.component';
import { ShoweventComponent } from './Event/showevent/showevent.component';
import { AddspeakerComponent } from './Speaker/addspeaker/addspeaker.component';
import { AllspeakersComponent } from './Speaker/allspeakers/allspeakers.component';
import { AddquizComponent } from './Quiz/addquiz/addquiz.component';
import { AddquestionComponent } from './Question/addquestion/addquestion.component';
import { AllquestionsComponent } from './Question/allquestions/allquestions.component';
import { AllquizzesComponent } from './Quiz/allquizzes/allquizzes.component';
import { ShowspeakerComponent } from './Speaker/showspeaker/showspeaker.component';
import { ShowquizComponent } from './Quiz/showquiz/showquiz.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ShowquestionComponent } from './Question/showquestion/showquestion.component';
import { UpdatespeakerComponent } from './Speaker/updatespeaker/updatespeaker.component';
import { UpdatequizComponent } from './Quiz/updatequiz/updatequiz.component';
import { UpdatequestionComponent } from './Question/updatequestion/updatequestion.component';
import { UpdateeventComponent } from './Event/updateevent/updateevent.component';
import { AddclaimComponent } from './Claim/addclaim/addclaim.component';
import { ShowclaimComponent } from './Claim/showclaim/showclaim.component';
import { AllclaimsComponent } from './Claim/allclaims/allclaims.component';
import { UpdateclaimComponent } from './Claim/updateclaim/updateclaim.component';


@NgModule({
  declarations: [
    AppComponent,
    BackComponent,
    FrontComponent,
 
    FooterComponent,
    LoginComponent,
    HeadderrComponent,
    PublicationComponent,
     AddPublicationComponent,
     DetailPublicationComponent,
     UpdatePublicationComponent,
     DetailCommentComponent,
     UpdateCommentComponent,
     AddEventComponent, 
     AlleventsComponent ,
     ShoweventComponent,
     AddspeakerComponent,
     AllspeakersComponent,
     AddquizComponent,
     AddquestionComponent,
     AllquestionsComponent,
     AllquizzesComponent,
     ShowspeakerComponent,
     ShowquizComponent,
     NotfoundComponent,
     ShowquestionComponent,
     UpdatespeakerComponent,
     UpdatequizComponent,
     UpdatequestionComponent,
     UpdateeventComponent,
     AddclaimComponent,
     ShowclaimComponent,
     AllclaimsComponent,
     UpdateclaimComponent
  

  ],
  imports: [
    BrowserModule,[RouterModule.forRoot(routes),],
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
