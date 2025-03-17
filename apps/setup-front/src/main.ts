import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { devTools } from '@ngneat/elf-devtools';

if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
  })
  .then(() => {
    if (!environment.production) {
      devTools();
    }
  }) // Initialize Elf DevTools after bootstrapping
  .catch((err) => console.error(err));
