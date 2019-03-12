import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WithdrawOffenceListComponent } from '../withdraw-offence-list.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { PdkCoreModule, PdkGridModule } from '@cpp/pdk';

describe('WithdrawOffenceListComponent', () => {
  let component: WithdrawOffenceListComponent;
  let fixture: ComponentFixture<WithdrawOffenceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawOffenceListComponent],
      imports: [PdkCoreModule, PdkGridModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(WithdrawOffenceListComponent);
    component = fixture.componentInstance;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
