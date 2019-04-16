import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'router-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppRouterContainer {
  constructor(router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const tree = router.parseUrl(router.url);
      if (tree.fragment) {
        setTimeout(() => {
          const element = document.querySelector(`[id="${tree.fragment}"]`);
          if (element) {
            element.scrollIntoView();
          }
        });
      }
    });
  }
}
