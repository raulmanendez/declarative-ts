import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostsDeclarativeComponent } from './pages/posts-declarative/posts-declarative.component';
import { PostssComponent } from './pages/postss/postss.component';
import { PostComponent } from './pages/post/post.component';
import { LoaderComponent } from './loader/loader.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdatePostComponent } from './pages/update-post/update-post.component';
import { DeclarativePostsComponent } from './pages/declarative-posts/declarative-posts.component';
import { PostFormComponent } from './pages/post-form/post-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    PostsDeclarativeComponent,
    PostssComponent,
    PostComponent,
    LoaderComponent,
    AddPostComponent,
    UpdatePostComponent,
    DeclarativePostsComponent,
    PostFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
