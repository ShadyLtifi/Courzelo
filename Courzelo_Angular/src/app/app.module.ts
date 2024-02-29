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
import { AddUserComponent } from './User/add-user/add-user.component';
import { RetrievealluserComponent } from './User/retrievealluser/retrievealluser.component';

@NgModule({
  declarations: [
    AppComponent,
    BackComponent,
    FrontComponent,
    FooterComponent,
    LoginComponent,
    HeadderrComponent,
    ContenuComponent,
    AddUserComponent,
    RetrievealluserComponent
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
