import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button class="astext" (click)="auth.logout({ returnTo: document.location.origin })">
        Log out
      </button>
    </ng-container>

    <ng-template #loggedOut>
      <button class="astext" (click)="auth.loginWithRedirect()">Log in</button>
    </ng-template>
  `,
  styles: [
    `.astext {
      background:none;
      border:none;
      margin:0;
      padding:0;
      cursor: pointer;
      color: #fff;
    }`
  ],
})
export class AuthButtonComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
}