import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  deletePrivateStories,
  setPrivateStories,
  StoriesINT,
} from 'src/app/actions/state.actions';
import { UserService } from 'src/app/services/user.service';

interface PrivateStories {
  privateStories: StoriesINT[];
}

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent implements OnInit {
  username!: string;
  privateStoriesSelector: Observable<StoriesINT[]>;
  privateStories: StoriesINT[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<PrivateStories>
  ) {
    this.privateStoriesSelector = this.store.select('privateStories');
  }

  ngOnInit(): void {
    let userFromStorage: string | null = localStorage.getItem('USER_DATA');
    if (!userFromStorage) {
      this.router.navigate(['/login'], { replaceUrl: true });
    } else {
      let { _id, firstname, lastname } = JSON.parse(userFromStorage);
      this.userService.getPrivateStories(_id).subscribe((res) => {
        this.store.dispatch(setPrivateStories({ stories: res }));
      });
      this.username = `${firstname} ${lastname}`;
    }
    this.privateStoriesSelector.subscribe((res) => (this.privateStories = res));
  }

  deleteStory(id: string) {
    this.userService
      .deleteStory(id)
      .subscribe(() => this.store.dispatch(deletePrivateStories({ id: id })));
  }
}
