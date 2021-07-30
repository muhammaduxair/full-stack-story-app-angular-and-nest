import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { updateUserData } from 'src/app/actions/state.actions';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  invalidIndecator = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private store: Store,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let userFromStorage: string | null = localStorage.getItem('USER_DATA');
    if (userFromStorage) {
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.invalidIndecator = '';
      this.userService.loginUser(this.loginForm.value).subscribe(
        (res) => {
          this.store.dispatch(updateUserData(res));
          localStorage.setItem('USER_DATA', JSON.stringify(res));
          this.router.navigate(['/'], { replaceUrl: true });
        },
        (err) =>
          setTimeout(() => (this.invalidIndecator = 'User Not Found'), 1000)
      );
    } else {
      this.invalidIndecator = 'Please Fill The Form Correctly';
    }
  }
}
