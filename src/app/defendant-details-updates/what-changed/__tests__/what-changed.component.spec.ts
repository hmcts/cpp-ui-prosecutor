import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhatChangedComponent } from '../what-changed.component';

describe('WhatChangedComponent', () => {
  let fixture: ComponentFixture<WhatChangedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [WhatChangedComponent],
    teardown: { destroyAfterEach: false }
});

    fixture = TestBed.createComponent(WhatChangedComponent);
  });

  it('should show name changed', () => {
    fixture.componentInstance.defendantDetailsUpdate = {
      nameUpdated: true,
      dateOfBirthUpdated: false,
      addressUpdated: false
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should show date of birth changed', () => {
    fixture.componentInstance.defendantDetailsUpdate = {
      nameUpdated: false,
      dateOfBirthUpdated: true,
      addressUpdated: false
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should show address changed', () => {
    fixture.componentInstance.defendantDetailsUpdate = {
      nameUpdated: false,
      dateOfBirthUpdated: false,
      addressUpdated: true
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should show all change', () => {
    fixture.componentInstance.defendantDetailsUpdate = {
      nameUpdated: true,
      dateOfBirthUpdated: true,
      addressUpdated: true
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
