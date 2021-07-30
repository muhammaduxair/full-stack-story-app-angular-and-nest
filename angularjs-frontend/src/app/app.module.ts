import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { PrivateComponent } from './pages/private/private.component';
import { StoreModule } from '@ngrx/store';
import {
  privateStoriesReducer,
  storiesReducer,
  userDataReducer,
} from './reducers/state.reucer';
import { StoryCompComponent } from './components/story-comp/story-comp.component';
import { AddstoryComponent } from './pages/addstory/addstory.component';
import { StoryDetailComponent } from './pages/story-detail/story-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    HomeComponent,
    ErrorComponent,
    FooterComponent,
    LoginComponent,
    PrivateComponent,
    StoryCompComponent,
    AddstoryComponent,
    StoryDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      userData: userDataReducer,
      stories: storiesReducer,
      privateStories: privateStoriesReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
