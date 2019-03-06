import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackButtonComponent } from '../back-button.component';
import { PdkButtonModule } from '@cpp/pdk';
import { RouterTestingModule } from '@angular/router/testing';
import { TechnicalErrorComponent } from '../technical-error.component';

describe('TechnicalErrorComponent', () => {
  let fixture: ComponentFixture<TestBackTechnicalErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackButtonComponent, TechnicalErrorComponent, TestBackTechnicalErrorComponent],
      imports: [PdkButtonModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(TestBackTechnicalErrorComponent);
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'technical-error-test',
    template: `
      <technical-error></technical-error>
    `
  })
  class TestBackTechnicalErrorComponent {}
});
