import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { SearchInputComponent } from '../search-input.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, provideRouter } from '@angular/router';

describe('SearchInputComponent', () => {
  let fixture: ComponentFixture<TestSearchInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TestSearchInputComponent, SearchInputComponent],
      providers: [provideRouter([]), { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '123' } } } }],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(TestSearchInputComponent);
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'search-test',
    template: `
      <search-input></search-input>
    `,
    imports: [SearchInputComponent]
  })
  class TestSearchInputComponent {}
});
