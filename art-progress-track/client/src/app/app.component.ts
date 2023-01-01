import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  template: `
  <div class="nav">
    <div><span class="astext" [routerLink]="['/']">Home</span></div>
    <div>
      
      <span>
        <u *ngIf="auth.user$ | async as user">
          <button class="astext" [routerLink]="['home/user-page']">Your Page</button>
        </u>
      </span>
      <span><app-auth-button></app-auth-button></span>
    </div>
  </div>

    <router-outlet></router-outlet>
  `,
  styles: [`
  .nav {
    position: sticky;
    top: 0;
    width: 100%;
    background-color: #3f51b5;
    color: #fff;
    display: flex;
    padding: 0 16px;
    align-items: center;
    height: 56px;
    font: 500 20px/32px Roboto, "Helvetica Neue", sans-serif;
    justify-content: space-between;
  }
  span{
    padding: 1rem;
  }
  .astext {
    background:none;
    border:none;
    margin:0;
    padding:0;
    cursor: pointer;
    color: #fff;
  }
  `]
})
export class AppComponent {
  //title = 'client';
  constructor(public auth: AuthService) {}

}
