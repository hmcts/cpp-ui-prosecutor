import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PdkCoreModule, PdkFoldableTextModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { StatementOfFactsComponent } from '../statement-of-facts.component';

describe('StatementOfFactsComponent', () => {
  let fixture: ComponentFixture<TestStatementOfFactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatementOfFactsComponent, TestStatementOfFactsComponent],
      imports: [CommonModule, PdkCoreModule, PdkFoldableTextModule]
    });

    fixture = TestBed.createComponent(TestStatementOfFactsComponent);
    fixture.componentInstance.statement = 'statement of facts';
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'statement-of-facts-test',
    template: `
      <statement-of-facts [statementOfFacts]="statement"> </statement-of-facts>
    `
  })
  class TestStatementOfFactsComponent {
    statement: string;
  }
});
