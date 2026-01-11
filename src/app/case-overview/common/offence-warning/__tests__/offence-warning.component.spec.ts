import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { OffenceWarningComponent } from '../offence-warning.component';

describe('OffenceWarning', () => {
  let fixture: ComponentFixture<TestOffenceWarningComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestOffenceWarningComponent, OffenceWarningComponent],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(TestOffenceWarningComponent);
  });

  it('should compile correctly with all warnings', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'offence-warning-test',
    template: `
      <offence-warning>
        This is a warning
      </offence-warning>
    `,
    imports: [OffenceWarningComponent]
  })
  class TestOffenceWarningComponent {}
});
