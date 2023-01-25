import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-image-page',
  template: `
  <body class = gray>
      <div class = center>
        <button (click)="originalSize()">Click resize image if applicable.</button>
      </div>
      <div class = center>
        <img [src]= url id = "image" class = "box1 white">
      </div>
      <br>

      <div class = "center white descriptors bolded">
        {{title}}
      </div>
      <div class = "center white descriptors">
        {{description}}
      </div>
      <div class = "center white descriptors">
        <a [routerLink]="['../../../../../other-users-page/', email]">{{email}}</a>
      </div>

  </body>
  `,
  styles: [`
    .box1 {
      
      max-height: 80vh;
    }

    .box2 {
      max-width: 10000px;
      max-height: 10000px;
    }

    .img {
      max-width:100%; height:auto;
    }

    .center {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .descriptors {
      width: 50%;
      margin: 0 auto;
    }

    .bolded { 
      font-weight: bold; 
    }

    .white {
      background-color: white;
    }

    .gray{
      background-color: rgb(245, 245, 245);
      height: 100vh;
    }

    `
  ]
})
export class ImagePageComponent {
  title = '';
  url = '';
  description = '';
  email = '';

  ngOnInit() {
    this.url = this.route.snapshot.paramMap.get('img')!;
    this.description = this.route.snapshot.paramMap.get('description')!
    this.title = this.route.snapshot.paramMap.get('title')!
    this.email = this.route.snapshot.paramMap.get('email')!
    if (!this.url) {
      alert('No url provided');
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  originalSize() {
    var element = document.getElementById("image");
    element!.classList.toggle("box2");
  } 

}
