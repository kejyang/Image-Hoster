import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { UsersListComponent } from './users-list/users-list.component';


import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './auth-button.component';
import { HomeComponent } from './home/home.component';
import { UserAddTestComponent } from './user-add-test/user-add-test.component';

import {RouterModule} from '@angular/router';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";



@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    AuthButtonComponent,
    HomeComponent,
    UserAddTestComponent,
    UploadImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-7lul6xrih3fszlxk.us.auth0.com',
      clientId: 'OMeGCm5PhBNc43hU2asu01G9oDEOO2gv'
    }),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    RouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
