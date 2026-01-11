import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { StatementOfFactsComponent } from '../statement-of-facts.component';

describe('StatementOfFactsComponent', () => {
  let fixture: ComponentFixture<TestStatementOfFactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestStatementOfFactsComponent, StatementOfFactsComponent],
      teardown: { destroyAfterEach: false }
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
    `,
    imports: [StatementOfFactsComponent]
  })
  class TestStatementOfFactsComponent {
    statement: string;
  }
});
