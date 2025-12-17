import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { RenderMode } from '@angular/ssr';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRoutesConfig([
      {
        path: 'products/:id',
        renderMode: RenderMode.Server
      },
      {
        path: '**',
        renderMode: RenderMode.Server
      }
    ])
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);