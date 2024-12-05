import { Routes } from '@angular/router';
import { FeedComponent } from './views/feed/feed.component';
import { NewPostComponent } from './views/new-post/new-post.component';
import { ConsultComponent } from './views/consult/consult.component';

export const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  { path: 'novo-topico', component: NewPostComponent },
  { path: 'consultar', component: ConsultComponent },
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
];
