import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'router-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <router-outlet></router-outlet>
  `,
    imports: [RouterModule]
})
export class AppRouterContainer {


  constructor() {
    const router = inject(Router);

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
