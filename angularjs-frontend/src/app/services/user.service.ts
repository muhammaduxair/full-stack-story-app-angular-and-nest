import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  createUserInt,
  loginUserINT,
  StoryINT,
} from '../interfaces/user.interface';
import { Observable } from 'rxjs';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private signupURL = 'http://localhost:3000/signup';
  private loginURL = 'http://localhost:3000/login';
  private storiesURL = 'http://localhost:3000/stories';
  private addStoryURL = 'http://localhost:3000/addstory';

  constructor(private http: HttpClient) {}

  createUser(user: createUserInt): Observable<createUserInt> {
    return this.http.post<createUserInt>(this.signupURL, user, httpOption);
  }

  loginUser(credential: loginUserINT): Observable<createUserInt> {
    return this.http.post<createUserInt>(this.loginURL, credential, httpOption);
  }

  addStory(story: StoryINT): Observable<StoryINT> {
    return this.http.post<StoryINT>(this.addStoryURL, story, httpOption);
  }

  getStories(): Observable<StoryINT[]> {
    return this.http.get<StoryINT[]>(this.storiesURL, httpOption);
  }

  getPrivateStories(id: string): Observable<StoryINT[]> {
    return this.http.get<StoryINT[]>(
      `${this.storiesURL}/private/${id}`,
      httpOption
    );
  }

  deleteStory(id: string): Observable<StoryINT> {
    return this.http.delete<StoryINT>(`${this.storiesURL}/${id}`, httpOption);
  }

  getStoryByID(id: string): Observable<StoryINT> {
    return this.http.get<StoryINT>(
      `http://localhost:3000/story/${id}`,
      httpOption
    );
  }
}
