import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-yp8wi18hj3yjl2vh.us.auth0.com',
      clientId: '9MZ61PUb56i5zDvFOMgBPS8Nj0adKttL',
      authorizationParams: {
        redirect_uri: window.location.origin,
      }
    }),
  ]
};
