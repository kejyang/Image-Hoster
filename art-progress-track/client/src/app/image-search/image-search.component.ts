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
    <p>
      image-search works!
    </p>
    <input type="text" [formControl]="title" placeholder="Write title here">
    <button class="btn btn-danger" (click)="searchImage(title.value!)">Search</button>

    <div class="horizontal">
    <tr *ngFor="let image of filteredImgArray">
      <img src={{image.url}} class = "resized" [routerLink]="['/image-page', image.url, image.description]">
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
export class ImageSearchComponent {

  imgArray: Image[] = [];
  filteredImgArray: Image[] = [];

  title = new FormControl('');

  constructor(public auth: AuthService, private route: ActivatedRoute, private userService: UserService, 
    private imageService: ImageService) {}

  ngOnInit(): void {
    this.fetchImages();
  }

  private fetchImages(): void {
    this.imageService.getImages().subscribe( result =>{
      this.imgArray = result;
    });
  }

  searchImage(title: string): void{
      this.filteredImgArray = this.imgArray.filter(x => x.title == title);
  }

}
