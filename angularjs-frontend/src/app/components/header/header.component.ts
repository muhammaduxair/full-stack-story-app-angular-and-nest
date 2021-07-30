import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateUserData, UserDataINT } from 'src/app/actions/state.actions';

interface UserState {
  userData: UserDataINT;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loginStatus = false;
  userData$: Observable<UserDataINT>;

  constructor(private store: Store<UserState>, private router: Router) {
    this.userData$ = store.select('userData');
  }

  ngOnInit(): void {
    let userFromStorage: string | null = localStorage.getItem('USER_DATA');
    if (userFromStorage) {
      this.store.dispatch(updateUserData(JSON.parse(userFromStorage)));
    }
    this.userData$.subscribe((res) => {
      if (res && res.email && res.password) {
        this.loginStatus = true;
      } else {
        this.loginStatus = false;
      }
    });
  }

  logout() {
    localStorage.setItem('USER_DATA', '');
    this.router.navigate(['/login']);
    let emptydata = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      createdAt: '',
    };
    this.store.dispatch(updateUserData(emptydata));
  }
}
