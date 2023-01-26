import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';

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
import { ImagePageComponent } from './image-page/image-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { GlobalImagesComponent } from './global-images/global-images.component';
import { UserImageEditComponent } from './user-image-edit/user-image-edit.component';
import { ImageSearchComponent } from './image-search/image-search.component';
import { OtherUsersPageComponent } from './other-users-page/other-users-page.component';
import { AddCommentComponent } from './add-comment/add-comment.component';



@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    AuthButtonComponent,
    HomeComponent,
    UserAddTestComponent,
    UploadImageComponent,
    ImagePageComponent,
    UserPageComponent,
    GlobalImagesComponent,
    UserImageEditComponent,
    ImageSearchComponent,
    OtherUsersPageComponent,
    AddCommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-7lul6xrih3fszlxk.us.auth0.com',
      clientId: 'OMeGCm5PhBNc43hU2asu01G9oDEOO2gv',
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
    }),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    RouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
