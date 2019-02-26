import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_CONFIG } from '@cpp/core';
import { CapabilitiesModule } from '@cpp/core';
import { AppConfigService } from './config.service';

export const fetchAppConfig = (appConfig: AppConfigService) => {
  return () => appConfig.load();
};

@NgModule({
  imports: [HttpClientModule, CapabilitiesModule.forRoot({ manifestPath: 'capabilities.json' })],
  providers: [
    AppConfigService,
    { provide: HTTP_CONFIG, useExisting: AppConfigService },
    {
      provide: APP_INITIALIZER,
      useFactory: fetchAppConfig,
      deps: [AppConfigService],
      multi: true
    }
  ]
})
export class AppConfigModule {}
