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
    #title {
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
    }

    img:hover {
      cursor: pointer;
    }

    .resized {
      max-height: 150px;
      margin-right: 40px;
    }

    .horizontal {
      display: flex;
      margin-left: 3%;
      flex-wrap:wrap;
    }

    .uploadImage{
      margin-left: 3%;
    }

    .uploadImageButton{
      display: none;
    }

    .name{
      font-weight: bold;
      font-size: 20px;
      margin-top: 3%;
      margin-left: 3%;
      margin-bottom:2%;
    }

    #works{
      font-weight: bold;
      border-bottom: 3px solid rgb(0,160,255);
      width:20%;
      margin-top:1%;
      margin-bottom: 2%;
      margin-left: 3%;
    }
    
`
  ]
})
export class UserPageComponent implements OnInit{

   currUser : User = {
    email: '',
    images: [],
  }; 

  imgArray: String[] = [];

  constructor(public auth: AuthService, private imageService: ImageService, private userService: UserService, private router: Router,) {}

  ngOnInit(): void {
    this.getCurrentUser();
  } 

  private getCurrentUser(): void{
    this.auth.user$.subscribe(result=> {
      this.userService.getUser(result?.name!).subscribe((user) => {
        this.currUser = user;
      });
    }); 
  }

  deleteImage(img:Image): void{
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
    this.imageService.deleteImage(img._id!).subscribe({
      next: () => {
        this.router.navigate(['/home/user-page']);
      }
    });
  }

  reveal(): void{
    var x = document.getElementById("uploadImageButton")!;
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

}
