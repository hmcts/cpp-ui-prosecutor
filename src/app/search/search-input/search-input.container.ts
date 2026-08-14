import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchInputComponent } from "./search-input.component";

@Component({
    selector: 'search-input-container',
    template: `
    <search-input (searchTerm)="search($event)"></search-input>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SearchInputComponent]
})
export class SearchInputContainer {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

 constructor() {}

  search(keyword: string) {
    this.router.navigate(['./search', keyword], { relativeTo: this.route });
  }
}
