import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { PostsDeclarativeComponent } from './pages/posts-declarative/posts-declarative.component';
import { PostssComponent } from './pages/postss/postss.component';
import { DeclarativePostsComponent } from './pages/declarative-posts/declarative-posts.component';
import { PostFormComponent } from './pages/post-form/post-form.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'imperative', component: PostsComponent },
  { path: 'declarative', component: PostsDeclarativeComponent },
  { path: 'postss', component: PostssComponent },
  { path: 'declarativeposts', component: DeclarativePostsComponent },
  { path: 'declarativeposts/add', component: PostFormComponent },
  { path: 'declarativeposts/edit/:id', component: PostFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
