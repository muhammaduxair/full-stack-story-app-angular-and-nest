import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { PrivateComponent } from './pages/private/private.component';
import { AddstoryComponent } from './pages/addstory/addstory.component';
import { StoryDetailComponent } from './pages/story-detail/story-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'private-stories', component: PrivateComponent },
  { path: 'addstory', component: AddstoryComponent },
  { path: 'story/:id', component: StoryDetailComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
