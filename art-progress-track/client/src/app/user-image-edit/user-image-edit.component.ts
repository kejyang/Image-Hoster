import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router, ParamMap  } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { Image } from '../image';
import { ImageService } from '../image.service';

@Component({
  selector: 'user-image-edit',
  template: `
    <body class = gray>
      <div class = center>
        <button (click)="originalSize()">Click resize image if applicable.</button>
      </div>
      <div class = center>
        <img [src]= tempImg.url id = "image" class = "box1">
      </div>
      <div class = "center white bolded">
        {{tempImg.title}}
      </div>
      <div class = "center white">
        {{tempImg.description}}
      </div>
      <div class=center>

        <button class="btn btn-danger" (click)="deleteImage(tempImg)">Delete</button>

        <button class="btn btn-danger" (click) = "reveal()">Edit Image</button>

      </div>

      <div class = "editImage" id = "editImage">
      
        <div class = "center">
          <input type="text" [formControl]="title" placeholder="Write the new title here.">
          <div>
          <input type="text" [formControl]="description" placeholder="Write the new description here.">
          <button class="btn btn-danger" (click)="editImage()">Submit Changes</button>
            
          </div>
        </div>
      </div>
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

  .editImage{
    display: none;
  }
  `
  ]
})
export class UserImageEditComponent {

  id = ''

  tempImg : Image = {
    title: '',
    email: '',
    url: '',
    description: '',
    date: 0,
  }

  currUser : User = {
    email: '',
    images: [],
  }; 

  description = new FormControl('');
  title = new FormControl('');

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (!this.id) {
      alert('No url provided');
    }
    console.log(this.id);

    this.imageService.getImage(this.id).subscribe((image) => {
      this.tempImg = image;
    });
    this.getCurrentUser();
  }

  constructor(
    public auth: AuthService, private imageService: ImageService, private userService: UserService, private router: Router,
    private route: ActivatedRoute,
  ) { }

  private getCurrentUser(): void{
    this.auth.user$.subscribe(result=> {
      this.userService.getUser(result?.name!).subscribe((user) => {
        this.currUser = user;
        console.log(this.currUser);
      });
    }); 
    /* console.log(this.currUser); */
  }

  deleteImage(img:Image): void{
    //console.log(url);
    this.currUser.images?.splice(this.currUser.images?.indexOf(img), 1);
    this.auth.user$.subscribe(result=> {
      this.userService.updateUser(result?.name!, this.currUser).subscribe({
        next: () => {
          //this.router.navigate(['/home/user-page']);
        },
        error: (error) => {
          alert('Failed to update employee');
          console.error(error);
        }
      });
    });  
    console.log('this is the image id', img._id);
    this.imageService.deleteImage(img._id!).subscribe({
      next: () => {
        this.router.navigate(['/home/user-page']);
      }
    });
  }

  originalSize(): void {
    var element = document.getElementById("image");
    element!.classList.toggle("box2");
    console.log(element)
  } 

  reveal(): void{
    var x = document.getElementById("editImage")!;
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  editImage(): void{
    this.tempImg.description = this.description.value!;
    this.tempImg.title = this.title.value!;
    this.imageService.updateImage(this.id, this.tempImg).subscribe({
      next: () => {
        location.reload();
      },
    });
  }

}
