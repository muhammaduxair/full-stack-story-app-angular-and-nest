import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addstory',
  templateUrl: './addstory.component.html',
  styleUrls: ['./addstory.component.scss'],
})
export class AddstoryComponent implements OnInit {
  visibilityError: boolean = false;

  addStoryForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(50),
    ]),
    visibility: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    let userFromStorage = localStorage.getItem('USER_DATA');
    if (this.addStoryForm.valid && userFromStorage) {
      let { _id, firstname, lastname } = JSON.parse(userFromStorage);
      this.userService
        .addStory({
          ...this.addStoryForm.value,
          user_id: _id,
          user_name: `${firstname} ${lastname}`,
          createdAt: Date.now().toString(),
        })
        .subscribe((res) => {
          this.router.navigate(['/']);
        });
    } else {
      this.addStoryForm.controls.visibility.errors &&
        (this.visibilityError = true);
    }
  }
}
