import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'user-image-edit',
  template: `
    <p>
      user-image-edit works!
    </p>
    <img [src]= url>
  `,
  styles: [
  ]
})
export class UserImageEditComponent {

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
