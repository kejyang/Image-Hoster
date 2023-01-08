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
    }`
  ]
})
export class UploadImageComponent {

  title = 'imageupload';
  Users$ = this.homeComponent.Users$;
  url = '';
  tempUser : User = {
    email: '',
    images: [],
  };

  tempImg : Image = {
    email: '',
    url: '',
    description: '',
    date: 0,
  }

  description = new FormControl('');

  constructor(private router: Router, private userService: UserService, private imageService: ImageService, 
    private fireStorage:AngularFireStorage, private homeComponent:HomeComponent, public auth: AuthService, private elementRef:ElementRef) {

  }

/*   async onFileChange(event:any){
    const file = event.target.files[0];
    if(file){
      const path = `images/${file.name}`
      const uploadTask =await this.fireStorage.upload(path,file);
      this.url = await uploadTask.ref.getDownloadURL();
      console.log(this.url);
      this.auth.user$.subscribe(result=> {
        console.log("test", result?.name);
        this.userService.getUser(result?.name!).subscribe((user) => {
          this.tempUser = user;
          console.log('this is the gotten user', this.tempUser.email);
          this.tempUser.images?.unshift(this.url);
          console.log('this is image array of current user', this.tempUser.images);
          this.userService.updateUser(this.tempUser.email!, this.tempUser).subscribe({
            next: () => {
              this.router.navigate(['/users']);
            },
            error: (error) => {
              alert('Failed to update user');
              console.error(error);
            }
          });
        });
      });
    }
  } */

  async onFileChange(event:any){
    const file = event.target.files[0];
    if(file){
      const path = `images/${file.name}`
      const uploadTask =await this.fireStorage.upload(path,file);
      this.url = await uploadTask.ref.getDownloadURL();
    }
  }

  /* async onUpload(){
    this.auth.user$.subscribe(result=> {
      this.userService.getUser(result?.name!).subscribe((user) => {
        this.tempImg.email = user.email!;
        this.tempImg.url = this.url;
        this.tempImg.date = Date.now();
        console.log('tempimg', this.tempImg);
        this.imageService.createImage(this.tempImg).subscribe({
          next: () => {
            //this.router.navigate(['/home/user-page']);
          },
          error: (error) => {
            alert('Failed to update image');
            console.error(error);
          }
        });
        this.imageService.getImages().subscribe(result =>{
          console.log("the result of get images", result);
          this.tempImg._id = result.find(i => i.url === this.tempImg.url)?._id;
        });
        console.log(this.tempImg._id);
        this.tempUser = user;
        this.tempUser.images?.unshift(this.tempImg);
        this.userService.updateUser(this.tempUser.email!, this.tempUser).subscribe({
          next: () => {
            //this.router.navigate(['/home/user-page']);
          },
          error: (error) => {
            alert('Failed to update user');
            console.error(error);
          }
        });
      });
    });
  } */


  async onUpload(){
    this.auth.user$.subscribe(result=> {
      this.userService.getUser(result?.name!).subscribe((user) => {
        this.tempImg.email = user.email!;
        this.tempImg.url = this.url;
        this.tempImg.date = Date.now();
        this.tempImg.description = this.description.value!;
        console.log('tempimg', this.tempImg);
        this.imageService.createImage(this.tempImg).subscribe({
          next: () => {
            this.imageService.getImages().subscribe(result =>{
              this.tempImg._id = result.find(i => i.url === this.tempImg.url)?._id;
              this.updateUser();
            });
            //this.router.navigate(['/home/user-page']);
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
        console.log("tempimg in updateuser function", this.tempImg);
        console.log("updateuser function", this.tempUser.images![0]);
        this.userService.updateUser(this.tempUser.email!, this.tempUser).subscribe({
          next: () => {
            this.router.navigate(['/home/user-page']);
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
    //var img = document.getElementById("preview2") as HTMLImageElement;
    var img = this.elementRef.nativeElement.querySelector('#preview2');
    console.log(img);
    //img.style.transform = "scale(1)";
    //img.style.transform = 'rotate(90deg)';
  }

  ngAfterViewInit() {
    /* this.elementRef.nativeElement.querySelector('#preview2')
                                  .addEventListener('click', this.resizeImg.bind(this)); */
  }

}
