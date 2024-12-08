import { Routes } from '@angular/router';
import { FeedComponent } from './views/feed/feed.component';
import { NewPostComponent } from './views/new-post/new-post.component';
import { ConsultComponent } from './views/consult/consult.component';
import { DetailedConsultComponent } from './views/detailed-consult/detailed-consult.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'feed', component: FeedComponent},
  { path: 'novo-topico', component: NewPostComponent },
  { path: 'consultar/:id', component: DetailedConsultComponent },
  { path: 'consultar', component: ConsultComponent },
];
