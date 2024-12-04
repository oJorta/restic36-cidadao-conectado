import { Routes } from '@angular/router';
import { FeedComponent } from './views/feed/feed.component';

export const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
];
