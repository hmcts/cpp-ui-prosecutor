import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OffenceComponent } from '../offence.component';
import { CommonModule } from '@angular/common';
import { PdkCheckboxInputModule, PdkCoreModule } from '@cpp/pdk';
import { MOCK_OFFENCES } from '../../../__tests__/test-mock-data';
import { Offence } from '../../../case-overview.interfaces';

describe('Offence component', () => {
  let fixture: ComponentFixture<TestOffenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestOffenceComponent, OffenceComponent],
      imports: [CommonModule, PdkCoreModule, PdkCheckboxInputModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(TestOffenceComponent);
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'test-offence',
  template: `
    <offence-component [number]="1" [offence]="offence"> </offence-component>
  `
})
class TestOffenceComponent {
  offence: Offence = MOCK_OFFENCES[0];
}
