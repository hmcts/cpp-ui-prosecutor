import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PleaMitigationComponent } from '../plea-mitigation.component';

describe('PleaMitigationComponent', () => {
  let fixture: ComponentFixture<TestPleaMitigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestPleaMitigationComponent, PleaMitigationComponent],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(TestPleaMitigationComponent);
    fixture.componentInstance.pleaMitigation = 'Mitigated plea';
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'plea-mitigation-test',
    template: `
      <plea-mitigation [pleaMitigation]="pleaMitigation"> </plea-mitigation>
    `,
    imports: [PleaMitigationComponent]
  })
  class TestPleaMitigationComponent {
    pleaMitigation: string;
  }
});
