import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { PostsDeclarativeComponent } from './pages/posts-declarative/posts-declarative.component';
import { PostssComponent } from './pages/postss/postss.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'imperative', component: PostsComponent },
  { path: 'declarative', component: PostsDeclarativeComponent },
  { path: 'postss', component: PostssComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
