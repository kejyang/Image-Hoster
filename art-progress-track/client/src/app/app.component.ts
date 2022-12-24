import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  template: `

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'client';

}
