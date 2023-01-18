import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { Image } from '../image';
import { ImageService } from '../image.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'image-search',
  template: `
    <div class ="center">
      <input type="text" [formControl]="title" placeholder="Write title/Email here">
    </div>
    <div class = "center">
      <button class="btn btn-danger" (click)="searchImage(title.value!)">Search titles</button>
      <button class="btn btn-danger" (click)="searchUser(title.value!)">Search users</button>
     </div>
    <div class="horizontal">
      <tr *ngFor="let image of filteredImgArray">
        <img src={{image.url}} class = "resized" [routerLink]="['/image-page', image.url, image.description, image.title, image.email]">
        <div id = "title" [routerLink]="['/image-page', image.url, image.description, image.title,image.email]">{{image.title}}</div>
        <div id = "artist" [routerLink]="['/other-users-page', image.email]">{{image.email}}</div>
      </tr>
    </div>

    <div class="horizontal">
    <tr *ngFor="let user of filterUserArray">
      <a [routerLink]="['../other-users-page/', user.email]">{{user.email}}</a>
    </tr>
  </div>
  `,
  styles: [`

  #title {
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
  }

  #artist {
    font-size: 12px;
    cursor: pointer;
  }

  img:hover {
    cursor: pointer;
  }

  .resized {
    max-width: 100px;
    max-height: 150px;
    margin:20px;
  }

  .horizontal {
    display: flex;
    flex-wrap:wrap;
    margin:20px;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  `
  ]
})
export class ImageSearchComponent {

  imgArray: Image[] = [];
  filteredImgArray: Image[] = [];
  userArray: User[] = [];
  filterUserArray: User[] = [];

  title = new FormControl('');

  constructor(public auth: AuthService, private route: ActivatedRoute, private userService: UserService, 
    private imageService: ImageService) {}

  ngOnInit(): void {
    this.fetchImages();
    this.fetchUsers();
  }

  private fetchImages(): void {
    this.imageService.getImages().subscribe( result =>{
      this.imgArray = result;
    });
  }

  private fetchUsers(): void{
    this.userService.getUsers().subscribe( result =>{
      this.userArray = result;
    });
  }

  searchImage(title: string): void{
      this.filterUserArray = [];
      this.filteredImgArray = this.imgArray.filter(x => x.title == title);
  }

  searchUser(email: string): void{
    this.filteredImgArray = [];
    this.filterUserArray = this.userArray.filter(x => x.email == email);
  }

}
