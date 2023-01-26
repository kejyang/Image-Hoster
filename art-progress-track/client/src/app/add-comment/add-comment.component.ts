import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../image.service';
import { Image } from '../image';
import { Comment } from '../comment';
import { AuthService } from '@auth0/auth0-angular';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'add-comment',
  template: `
    <p>
      add-comment works! {{id}}
    </p>
    

    <input type="text" [formControl]="comment" placeholder="Write your comment here.">
    <button class="btn btn-danger" (click)="submit()">Submit Changes</button>

    <tr *ngFor="let cmt of tempImg.comments">
      {{cmt.email}}
      {{cmt.comment}}
    </tr>
  `,
  styles: [
  ]
})
export class AddCommentComponent {

  @Input() id = '';

  tempImg : Image = {
    title: '',
    email: '',
    url: '',
    description: '',
    date: 0,
    comments: [],
  }

  comment = new FormControl('');

  tempComment : Comment ={
    email: '',
    comment: '',
  }
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService,
    public auth: AuthService,
  ) { }

  ngOnInit() {
   // this.id = this.route.snapshot.paramMap.get('id')!;
    this.imageService.getImage(this.id).subscribe((image) => {
      this.tempImg = image;
    }); 
    console.log(this.id);
    this.auth.user$.subscribe(result=> {
      this.tempComment.email = result!.name;
    }); 
  }

  submit(){
    this.tempComment.comment = this.comment.value!;
    this.tempImg.comments?.push(this.tempComment);
    this.imageService.updateImage(this.id, this.tempImg).subscribe({
      next: () => {
        location.reload();
      },
    });
  }

}
