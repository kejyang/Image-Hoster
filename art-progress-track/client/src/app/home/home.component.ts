import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {

  Users$: Observable<User[]> = new Observable();
  currUser : User = {
    email: '',
    images: [],
  };

  constructor(public auth: AuthService, private route: ActivatedRoute, private userService: UserService,) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.getCurrentUser();
  }

  private fetchUsers(): void {
    this.Users$ = this.userService.getUsers();
    //console.log(this.Users$);
  }

  private getCurrentUser(): void{
    this.auth.user$.subscribe(result=> {
      this.userService.getUser(result?.name!).subscribe((user) => {
        this.currUser = user;
      });
    }); 
  }

}