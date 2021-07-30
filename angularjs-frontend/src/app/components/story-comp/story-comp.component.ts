import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { StoryINT } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-story-comp',
  templateUrl: './story-comp.component.html',
  styleUrls: ['./story-comp.component.scss'],
})
export class StoryCompComponent implements OnInit {
  userFromStorage = localStorage.getItem('USER_DATA');
  userID!: string;

  @Input() story!: StoryINT;
  @Output() onDeleteStory: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (this.userFromStorage) {
      this.userID = JSON.parse(this.userFromStorage)._id;
    }
  }

  onDelete(story: StoryINT) {
    this.onDeleteStory.emit(story._id);
  }
}
