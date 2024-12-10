import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Set up routing
    ...appConfig.providers, provideAnimationsAsync(), provideAnimationsAsync(), // Keep existing appConfig providers, if any
  ]
})
  .catch((err) => console.error(err));