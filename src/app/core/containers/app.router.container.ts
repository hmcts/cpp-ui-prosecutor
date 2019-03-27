import { ChangeDetectorRef, Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'router-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppRouterContainer {
  constructor(router: Router, cdr: ChangeDetectorRef) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        cdr.detach();
      }
      // scroll back to the top of the page upon route change
      if (event instanceof NavigationEnd) {
        cdr.reattach();

        const tree = router.parseUrl(router.url);

        if (tree.fragment) {
          setTimeout(() => {
            const element = document.querySelector(`[id="${tree.fragment}"]`);

            if (element) {
              element.scrollIntoView();
            }
          });
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
  }
}
