import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { Image } from '../image';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-other-users-page',
  templateUrl: `./other-users-page.html`,
  styles: [`

  #title {
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
  }


  .resized {
    max-width: 150px;
    max-height: 150px;
    margin-right: 40px;
  }

  .horizontal {
    display: flex;
    margin-left: 3%;
    margin-right: 3%;
    flex-wrap:wrap;
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
export class OtherUsersPageComponent {

  email = '';

  user : User = {
    email: '',
    images: [],
  }; 

  constructor(public auth: AuthService, private imageService: ImageService, private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email')!;
    if (!this.email) {
      alert('No email provided');
    }
    this.userService.getUser(this.email).subscribe(result => {
      this.user = result;
    });
  } 
}
