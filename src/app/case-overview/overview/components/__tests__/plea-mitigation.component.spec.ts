import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PdkCoreModule, PdkFoldableTextModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { PleaMitigationComponent } from '../plea-mitigation.component';

describe('PleaMitigationComponent', () => {
  let fixture: ComponentFixture<TestPleaMitigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PleaMitigationComponent, TestPleaMitigationComponent],
      imports: [CommonModule, PdkCoreModule, PdkFoldableTextModule]
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
    `
  })
  class TestPleaMitigationComponent {
    pleaMitigation: string;
  }
});
