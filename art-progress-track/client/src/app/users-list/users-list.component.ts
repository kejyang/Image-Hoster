import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';
import { AuthService } from '@auth0/auth0-angular';
 
@Component({
 selector: 'app-users-list',
 template: `
   <h2 class="text-center m-5">Users List</h2>
   
   <table class="table table-striped table-bordered">
       <thead>
           <tr>
               <th>Email</th>
               <th>Images</th>
           </tr>
       </thead>
 
       <tbody>
           <tr *ngFor="let user of users$ | async">
               <td>{{user.email}}</td>
               <td>{{user.images}}</td>
               <td>
                   <button class="btn btn-primary me-1" [routerLink]="['edit/', user._id]">Edit</button>
               </td>
           </tr>
       </tbody>
   </table>
 
 `
})
export class UsersListComponent implements OnInit {
 users$: Observable<User[]> = new Observable();
 
 constructor(private usersService: UserService, public auth: AuthService) { }
 
 ngOnInit(): void {
   this.fetchUsers();
 }
 
 
 private fetchUsers(): void {
   this.users$ = this.usersService.getUsers();
 }
}
