import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackComponent } from './back/back.component';
import { FrontComponent } from './front/front.component';

import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HeadderrComponent } from './headderr/headderr.component';
import { ClasseComponent } from './classe/classe.component';
import { HttpClientModule } from '@angular/common/http';
import { ContenuComponent } from './contenu/contenu.component';
import { AddClassComponent } from './add-class/add-class.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BackComponent,
    FrontComponent,
 
    FooterComponent,
    LoginComponent,
    HeadderrComponent,
    ClasseComponent,
    ContenuComponent,
    AddClassComponent
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
