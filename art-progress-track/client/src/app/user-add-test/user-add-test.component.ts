import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-add-test',
  template: `
  <form [formGroup]="testForm" (ngSubmit)="onSubmit()">
    <div>
      <label for="name">
        Name
      </label>
      <input id="name" type="text" formControlName="name">
    </div>
    <button class="button" type="submit">Test</button>

  </form>


  `,
  styles: [
  ]
})
export class UserAddTestComponent {

  emptyImgArray: string[] = []

  testForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    images: new FormControl(this.emptyImgArray),
  });

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder,) {

  }

  tempUser : User = {
    email: '',
    images: [],
  };

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    this.tempUser.email = this.testForm.value.name;
    this.tempUser.images = this.testForm.value.images;
    console.warn('This is the name', this.tempUser.email);
    this.userService.createUser(this.tempUser)
      .subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert("Failed to create employee");
        console.error(error);
      }
    });
  }
}
