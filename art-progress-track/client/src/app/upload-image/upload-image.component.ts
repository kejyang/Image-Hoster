import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';

import { Firestore } from '@angular/fire/firestore';
import { AngularFireStorage } from "@angular/fire/compat/storage"
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { HomeComponent } from '../home/home.component';



@Component({
  selector: 'app-upload-image',
  template: `
    <input type = "file" (change) = "onFileChange($event)">

    <img [src]= url alt="Place image title">

  `,
  styles: [
  ]
})
export class UploadImageComponent {

  title = 'imageupload';
  Users$ = this.homeComponent.Users$;
  url = '';

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder, 
    private fireStorage:AngularFireStorage, private homeComponent:HomeComponent,) {

  }

  async onFileChange(event:any){
    const file = event.target.files[0];
    if(file){
      const path = `images/${file.name}`
      const uploadTask =await this.fireStorage.upload(path,file);
      this.url = await uploadTask.ref.getDownloadURL();
      console.log(this.url);
    }
  }

}
