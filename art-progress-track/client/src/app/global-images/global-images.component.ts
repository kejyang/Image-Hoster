import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { Image } from '../image';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-global-images',
  template: `

  <div class="horizontal">
    <tr *ngFor="let image of imgArray$">
      <img src={{image.url}} class = "resized" [routerLink]="['/image-page', image.url, image.description, image.title, image.email]">
      <div id = "title" [routerLink]="['/image-page', image.url, image.description, image.title,image.email]">{{image.title}}</div>
      <div id = "artist" [routerLink]="['/other-users-page', image.email]">{{image.email}}</div>
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
    max-height: 150px;
    margin-right: 40px;
  }

  .horizontal {
    display: flex;
    flex-wrap:wrap;
    margin:20px;
  }

  .center {
    text-align: center;
  }
  `
  ]
})
export class GlobalImagesComponent {

  imgArray$: Image[] = []; 

  constructor(public auth: AuthService, private imageService: ImageService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.imageService.getImages().subscribe( result =>{
      this.imgArray$ = result;
      this.imgArray$ = this.imgArray$.reverse();
    });
  }
}
