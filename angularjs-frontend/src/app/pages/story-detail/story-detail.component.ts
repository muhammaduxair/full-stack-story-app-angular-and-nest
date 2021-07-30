import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoryINT } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss'],
})
export class StoryDetailComponent implements OnInit {
  storyData!: StoryINT;
  createdDate: string = '';
  param: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) =>
      this.userService.getStoryByID(id).subscribe(
        (res) => {
          this.storyData = res;
          this.param = id;
          this.createdDate = moment(Number(res.createdAt)).format(
            'MMMM Do YYYY, h:mm:ss a'
          );
        },
        (err) => console.log(err)
      )
    );
  }
}
