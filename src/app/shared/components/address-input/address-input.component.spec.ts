import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AddressInputComponent } from './address-input.component';
import { PdkForm, PdkFormComponent } from '@cpp/pdk';

describe('Address Input component all fields optional', () => {
  let fixture: ComponentFixture<TestAddressComponentNoRequiredFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, TestAddressComponentNoRequiredFieldComponent, AddressInputComponent]
    });
    fixture = TestBed.createComponent(TestAddressComponentNoRequiredFieldComponent);
    fixture.detectChanges();
  });

  it('correctly compiles', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'test-input-address',
  template: `
    <form pdk-form>
      <input-address name="address" [ngModel]="model" aria-describedby="identifier" [isRequired]="required">
      </input-address>
    </form>
  `,
  imports: [FormsModule, ReactiveFormsModule, AddressInputComponent]
})
class TestAddressComponentNoRequiredFieldComponent {
  model: {};
  required = false;
}

describe('Address Input component with required field(s)', () => {
  let fixture: ComponentFixture<TestAddressComponentWithRequiredFieldComponent>;
  let form: NgForm;
  let pdkForm: PdkFormComponent;
  let address1Input: DebugElement;
  let address2Input: DebugElement;
  let postcodeInput: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TestAddressComponentWithRequiredFieldComponent,
        AddressInputComponent,
        PdkForm
      ]
    });

    fixture = TestBed.createComponent(TestAddressComponentWithRequiredFieldComponent);
    form = fixture.debugElement.children[0].injector.get(NgForm);
    pdkForm = fixture.debugElement.children[0].injector.get(PdkFormComponent);
    jest.spyOn(pdkForm, 'addExternalError');
    fixture.detectChanges();

    address1Input = fixture.debugElement.query(By.css(`input[name='address1']`));
    address2Input = fixture.debugElement.query(By.css(`input[name='address2']`));
    postcodeInput = fixture.debugElement.query(By.css(`input[name='postcode']`));
  });

  function setAddressValues(values: { address1?: string; address2?: string; postcode?: string }) {
    const { address1 = '', address2 = '', postcode = '' } = values;

    address1Input.nativeElement.value = address1;
    address2Input.nativeElement.value = address2;
    postcodeInput.nativeElement.value = postcode;

    address1Input.nativeElement.dispatchEvent(new Event('input'));
    address2Input.nativeElement.dispatchEvent(new Event('input'));
    postcodeInput.nativeElement.dispatchEvent(new Event('input'));
  }

  const error = {
    addressRequired: {
      address1: true
    },
    postcodeRequired: {
      postcode: true
    },
    address1SpecialChar: { address1: true },
    postcodeFormat: { postcode: true }
  };

  it('should compile correctly when the control has an external error', () => {
    expect(fixture.componentInstance).toBeTruthy();
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should populate the internal inputs when an external value is provided', fakeAsync(() => {
    fixture.componentInstance.model = {
      address1: '22DF',
      address2: 'DFAcacia Avenue',
      postcode: 'DF12 0AA'
    };
    fixture.detectChanges();
    tick();
    discardPeriodicTasks();
    expect(address1Input.nativeElement.value).toEqual('22DF');
    expect(address2Input.nativeElement.value).toEqual('DFAcacia Avenue');
    expect(postcodeInput.nativeElement.value).toEqual('DF12 0AA');
  }));

  it('should raise an `addressRequired` validation error when required field(s) is/are empty', () => {
    setAddressValues({ address1: '' }); // only address1 is required
    setAddressValues({ address2: 'ben street' });
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    expect(form.valid).toBe(false);
    expect(form.control.controls['address'].errors.addressRequired).toEqual(error.addressRequired);
    expect(form.control.hasError('addressRequired', ['address'])).toBe(true);
    expect((pdkForm.addExternalError as jest.Mock).mock.calls[0]).toMatchSnapshot();
  });

  it('should raise an `postcodeRequired` validation error when required postcode field is empty', () => {
    setAddressValues({ address1: 'ben street', postcode: '' });
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    expect(form.valid).toBe(false);
    expect(form.control.controls['address'].errors.postcodeRequired).toEqual(error.postcodeRequired);
    expect(form.control.hasError('postcodeRequired', ['address'])).toBe(true);
    expect((pdkForm.addExternalError as jest.Mock).mock.calls[0]).toMatchSnapshot();
  });

  it('should raise a `postcodeFormat` validation error when postcode field is invalidated', () => {
    setAddressValues({ address1: '31 London', postcode: 'bhx 11' });
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    expect(form.valid).toBe(false);
    expect(form.control.controls['address'].errors.postcodeFormat).toEqual(error.postcodeFormat);
    expect(form.control.hasError('postcodeFormat', ['address'])).toBe(true);
    expect((pdkForm.addExternalError as jest.Mock).mock.calls[0]).toMatchSnapshot();
  });

  it('should raise a `postcodeFormat` validation error when postcode does not have a space', () => {
    setAddressValues({ address1: '31 London', postcode: 'sw161lz' });
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    expect(form.valid).toBe(false);
    expect(form.control.controls['address'].errors.postcodeFormat).toEqual(error.postcodeFormat);
    expect(form.control.hasError('postcodeFormat', ['address'])).toBe(true);
    expect((pdkForm.addExternalError as jest.Mock).mock.calls[0]).toMatchSnapshot();
  });

  it('should raises a `address1SpecialChar` validation error when address line 1 starts with a special char', () => {
    setAddressValues({ address1: '!31 London', postcode: 'sw16 1lz' });
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    expect(form.valid).toBe(false);
    expect(form.control.controls['address'].errors.address1SpecialChar).toEqual(error.address1SpecialChar);
    expect(form.control.hasError('address1SpecialChar', ['address'])).toBe(true);
    expect((pdkForm.addExternalError as jest.Mock).mock.calls[0]).toMatchSnapshot();
  });
});

@Component({
  selector: 'test-input-address',
  template: `
    <form pdk-form>
      <input-address name="address" [ngModel]="model" [validWhenEmpty]="false" [isRequired]="required"> </input-address>
      <button type="submit">Submit</button>
    </form>
  `,
  imports: [FormsModule, ReactiveFormsModule, AddressInputComponent, PdkForm]
})
class TestAddressComponentWithRequiredFieldComponent {
  model: {};
  required = true;
}
