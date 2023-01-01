import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-image-page',
  template: `
    <p>
      image-page works!
    </p>
    <img [src]= url>
    
  `,
  styles: [
  ]
})
export class ImagePageComponent {
  url = ''

  ngOnInit() {
    this.url = this.route.snapshot.paramMap.get('img')!;
    if (!this.url) {
      alert('No url provided');
    }
    console.log(this.url);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

}
