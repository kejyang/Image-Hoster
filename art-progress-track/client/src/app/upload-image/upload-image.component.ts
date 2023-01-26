import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import { UserService } from '../user.service';
import { User } from '../user';

import { Image } from '../image';
import { ImageService } from '../image.service';

import { Firestore } from '@angular/fire/firestore';
import { AngularFireStorage } from "@angular/fire/compat/storage"
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styles: [`
    .resized {
      max-width: 100px;
      max-height: 150px;
    }

    .uploadButton{
      display: none;
    }
    `
  ]
})
export class UploadImageComponent {

  url = '';
  tempUser : User = {
    email: '',
    images: [],
  };

  tempImg : Image = {
    title: '',
    email: '',
    url: '',
    description: '',
    date: 0,
    comments: [],
  }

  fileLoaded = false;

  description = new FormControl('');
  title = new FormControl('');

  constructor(private router: Router, private userService: UserService, private imageService: ImageService, 
    private fireStorage:AngularFireStorage, private homeComponent:HomeComponent, public auth: AuthService, private elementRef:ElementRef) {

  }

  async onFileChange(event:any){
    const file = event.target.files[0];
    if(file){
      const path = `images/${file.name}`
      const uploadTask =await this.fireStorage.upload(path,file);
      this.url = await uploadTask.ref.getDownloadURL();
    }
    var x = document.getElementById("uploadButton")!;
    x.style.display = "block";
  }

  async onUpload(){
    this.auth.user$.subscribe(result=> {
      this.userService.getUser(result?.name!).subscribe((user) => {
        this.tempImg.email = user.email!;
        this.tempImg.url = this.url;
        this.tempImg.date = Date.now();
        this.tempImg.description = this.description.value!;
        this.tempImg.title = this.title.value!;

        this.imageService.createImage(this.tempImg).subscribe({
          next: () => {
            this.imageService.getImages().subscribe(result =>{
              this.tempImg._id = result.find(i => i.url === this.tempImg.url)?._id;
              this.updateUser();
            });
          },
          error: (error) => {
            alert('Failed to update image');
            console.error(error);
          }
        });
      });
    });
  }

  async updateUser(){
    this.auth.user$.subscribe(result=> {
      this.userService.getUser(result?.name!).subscribe((user) => {
        this.tempUser = user;
        this.tempUser.images?.unshift(this.tempImg);
        this.userService.updateUser(this.tempUser.email!, this.tempUser).subscribe({
          next: () => {
            location.reload();
          },
          error: (error) => {
            alert('Failed to update user');
            console.error(error);
          }
        });
      });
    });
  }


  async resizeImg(){
    var img = this.elementRef.nativeElement.querySelector('#preview2');
  }

}
