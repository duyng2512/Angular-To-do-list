import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostsComponent } from './components/posts/posts.component';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { NewPostComponent } from './components/new-post/new-post.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PostComponent } from './components/post/post.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DailyTaskComponent } from './components/daily-task/daily-task.component';
import { ImportantTaskComponent } from './components/important-task/important-task.component';
import { PlannedTaskComponent } from './components/planned-task/planned-task.component';
import { AssignTaskComponent } from './components/assign-task/assign-task.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersComponent,
    NavbarComponent,
    PostsComponent,
    NewPostComponent,
    HomeComponent,
    AboutComponent,
    PostComponent,
    NotFoundComponent,
    SideBarComponent,
    DailyTaskComponent,
    ImportantTaskComponent,
    PlannedTaskComponent,
    AssignTaskComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
  ],
  providers: [UserService, PostService],
  bootstrap: [AppComponent],
})
export class AppModule {}
