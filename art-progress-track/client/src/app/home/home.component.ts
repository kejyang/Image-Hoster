import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`  
    #works{
      font-weight: bold;
      border-bottom: 3px solid rgb(0,160,255);
      width:20%;
      margin-top:1%;
      margin-bottom: 2%;
      margin-left: 3%;
    }

    .center {
      text-align: center;
    }
  `
  ],
})
export class HomeComponent implements OnInit {

  Users$: Observable<User[]> = new Observable();
  users: User[] = [];
  currUser : User = {
    email: '',
    images: [],
  };

  tempUser : User = {
    email: '',
    images: [],
  };

  constructor(public auth: AuthService, private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.getCurrentUser();
  }

  private fetchUsers(): void {
    this.userService.getUsers().subscribe( result =>{
      this.users = result;
      //this.addCurrentUser();
    });
    //console.log(this.Users$);
  }

  private getCurrentUser(): void{
    this.auth.user$.subscribe(result=> {
      this.userService.getUser(result?.name!).subscribe((user) => {
        this.currUser = user;
      });
    }); 
  }

  private addCurrentUser(): void{
    this.auth.user$.subscribe(result=> {
      if(this.auth.isAuthenticated$){
        this.tempUser.email = result?.name!;
        console.log(this.tempUser.email);
        if(this.users.find(x => x.email == this.tempUser.email) === undefined){
          debugger;
          console.log(this.tempUser.email);
          this.userService.createUser(this.tempUser).subscribe({
            next: () => {
              this.router.navigate(['/']);
            },
            error: (error) => {
              //alert("Failed to create user");
              console.error(error);
            }
          });
        } 
      }
    }); 
    
  }
}