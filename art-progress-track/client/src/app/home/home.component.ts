import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  Users$: Observable<User[]> = new Observable();

  constructor(public auth: AuthService, private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();

  }

  private fetchUsers(): void {
    this.Users$ = this.userService.getUsers();
  }

}