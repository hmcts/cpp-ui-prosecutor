import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkCoreModule, PdkFormModule, PdkWarningTextModule } from '@cpp/pdk';
import { Component } from '@angular/core';
import { OffenceWarningComponent } from '../offence-warning.component';

describe('OffenceWarning', () => {
  let fixture: ComponentFixture<TestOffenceWarningComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestOffenceWarningComponent, OffenceWarningComponent],
      imports: [PdkCoreModule, PdkFormModule, PdkWarningTextModule],
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
    `
  })
  class TestOffenceWarningComponent {}
});
