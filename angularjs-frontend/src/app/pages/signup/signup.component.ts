import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataINT } from 'src/app/actions/state.actions';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  invalidIndecator = false;

  constructor(private userService: UserService, private router: Router) {}

  signupForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirm_password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    let userFromStorage: string | null = localStorage.getItem('USER_DATA');
    if (userFromStorage) {
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      let userData: UserDataINT = {
        firstname: this.signupForm.value.firstname,
        lastname: this.signupForm.value.lastname,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        createdAt: Date.now().toString(),
      };
      this.userService.createUser(userData).subscribe(() => {
        this.router.navigate(['/login']);
      });
      this.invalidIndecator = false;
    } else {
      this.invalidIndecator = true;
    }
  }
}
