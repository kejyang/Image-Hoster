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
        <img [src]= url id = "image" class = "box1">
      </div>
      <div class = center>{{description}}</div>
  </body>
  `,
  styles: [`
    .box1 {
      max-width: 600px;
      max-height: 600px;
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

    .gray{
      background-color: rgb(245, 245, 245);
      height: 100vh;
    }
    `
  ]
})
export class ImagePageComponent {
  url = ''
  description = ''

  ngOnInit() {
    this.url = this.route.snapshot.paramMap.get('img')!;
    this.description = this.route.snapshot.paramMap.get('description')!
    if (!this.url) {
      alert('No url provided');
    }
    console.log(this.url);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  originalSize() {
    var element = document.getElementById("image");
    element!.classList.toggle("box2");
    console.log(element)
  } 

}
