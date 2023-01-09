import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
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

  a:link, a:visited {
    color: white;
    text-decoration: none;
    display: inline-block;
  }
  `]
})
export class AppComponent {
  //title = 'client';
  constructor(public auth: AuthService) {}

}
