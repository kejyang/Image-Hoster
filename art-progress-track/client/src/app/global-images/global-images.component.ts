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
  <div class=center>These are all the images</div>

  <div class="horizontal">
    <tr *ngFor="let image of imgArray$">
      <img src={{image.url}} class = "resized" [routerLink]="['/image-page', image.url]">
    </tr>
  </div>
  `,
  styles: [`
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
    });
  }
}
