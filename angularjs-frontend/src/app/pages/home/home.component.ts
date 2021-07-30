import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoryINT } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { Store } from '@ngrx/store';
import { deleteStories, setStories } from 'src/app/actions/state.actions';
import { Observable } from 'rxjs';

interface stories {
  stories: StoryINT[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  storiesSelector: Observable<StoryINT[]>;
  publicStories: StoryINT[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store<stories>
  ) {
    this.storiesSelector = this.store.select('stories');
  }

  ngOnInit(): void {
    let userFromStorage: string | null = localStorage.getItem('USER_DATA');
    if (!userFromStorage) {
      this.router.navigate(['/login'], { replaceUrl: true });
    } else {
      this.userService
        .getStories()
        .subscribe((res) => this.store.dispatch(setStories({ stories: res })));
    }
    this.storiesSelector.subscribe((res) => {
      this.publicStories = res;
    });
  }

  deleteStory(id: string) {
    this.userService
      .deleteStory(id)
      .subscribe(() => this.store.dispatch(deleteStories({ id: id })));
  }
}
