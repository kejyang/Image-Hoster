import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { Image } from '../image';
import { ImageService } from '../image.service';
@Component({
  selector: 'user-page',
  template: `
    <app-upload-image></app-upload-image>
    These are your images
    <div>
      Test Value : {{currUser.email}}
    </div>
    <div class="horizontal">
      <tr *ngFor="let url of currUser.images">
        <img src={{url}} class = "resized" [routerLink]="['/image-page', url]">
        <td>
          <button class="btn btn-danger" (click)="deleteImage(url)">Delete</button>
        </td>
      </tr>
    </div>
    <button class="btn btn-danger" (click)="testDeleteFunction()">Test Delete Images Collection</button>


  `,
  styles: [
    `
    .resized {
      max-width: 150px;
      max-height: 150px;
    }

    .horizontal {
      display: flex;
      
      flex-wrap:wrap;
    }
    
`
  ]
})
export class UserPageComponent implements OnInit{
  /* @Input() currUser!: String; */

   currUser : User = {
    email: '',
    images: [],
  }; 

  imgArray: String[] = [];

  constructor(public auth: AuthService, private imageService: ImageService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentUser();

  } 
  /* ngOnChanges(): void{
    this.getCurrentUser();
  } */

  private getCurrentUser(): void{
    this.auth.user$.subscribe(result=> {
      this.userService.getUser(result?.name!).subscribe((user) => {
        this.currUser = user;
        console.log(this.currUser);
      });
    }); 
    /* console.log(this.currUser); */
  }

  deleteImage(url:string): void{
    console.log(url);
    this.currUser.images?.splice(this.currUser.images?.indexOf(url), 1);
    this.auth.user$.subscribe(result=> {
      this.userService.updateUser(result?.name!, this.currUser).subscribe({
        next: () => {
          this.router.navigate(['/home/user-page']);
        },
        error: (error) => {
          alert('Failed to update employee');
          console.error(error);
        }
      });
    }); 

    this.imageService.getImage(url).subscribe(result=> {
/*       this.imageService.deleteImage(result._id!).subscribe({
        next: () => {
          this.router.navigate(['/home/user-page']);
        },
        error: (error) => {
          console.error(error);
        }
      }); */
    });
    
    
  }

  testDeleteFunction(){
    this.imageService.getImage("").subscribe(result=>{
      console.log(result._id);
      
    });

    
  }

  goToImagePage(): void{

    console.log("go to image page method clicked"); 
  }

}
