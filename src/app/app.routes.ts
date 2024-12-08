import { Routes } from '@angular/router';
import { FeedComponent } from './views/feed/feed.component';
import { ConsultComponent } from './views/consult/consult.component';
import { DetailedConsultComponent } from './views/detailed-consult/detailed-consult.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'feed', component: FeedComponent},
  { path: 'consultar/:category/:id', component: DetailedConsultComponent },
  { path: 'consultar', component: ConsultComponent },
];
