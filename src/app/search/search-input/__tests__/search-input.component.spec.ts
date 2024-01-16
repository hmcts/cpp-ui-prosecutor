import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { SearchInputComponent } from '../search-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdkCoreModule, PdkFormModule, PdkGridModule, PdkSearchbarModule } from '@cpp/pdk';

describe('SearchInputComponent', () => {
  let fixture: ComponentFixture<TestSearchInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInputComponent, TestSearchInputComponent],
      imports: [CommonModule, FormsModule, PdkCoreModule, PdkFormModule, PdkSearchbarModule, PdkGridModule],
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
    `
  })
  class TestSearchInputComponent {}
});
