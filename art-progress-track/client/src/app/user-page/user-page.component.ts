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
  templateUrl: './user-page.component.html',
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

  constructor(public auth: AuthService, private imageService: ImageService, private userService: UserService, private router: Router,) {}

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

  deleteImage(img:Image): void{
    //console.log(url);
    this.currUser.images?.splice(this.currUser.images?.indexOf(img), 1);
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
    console.log('this is the image id', img._id);
    this.imageService.deleteImage(img._id!).subscribe({
      next: () => {
        this.router.navigate(['/home/user-page']);
      }
    });
  }

  testGetImageFunction(){
    /* this.imageService.getImage().subscribe((img) => {
      console.log(img);
    }); */
  }



}
