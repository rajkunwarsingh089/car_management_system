import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appCustomValidators]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => CustomValidatorsDirective), multi: true },
  ],
})
export class CustomValidatorsDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    // Check if the value is empty (required field)
    if (value === '') {
      return { required: true };
    }

    // Check if the value is alphanumeric (letters, hypens and numbers only)
    const alphanumericPattern = /^[a-zA-Z0-9-]*$/;
    if (!alphanumericPattern.test(value)) {
      return { alphanumeric: true }; // Custom error for non-alphanumeric input
    }

    // Check if the value has a minimum length of 10 characters
    if (value?.length < 10) {
      return { minlength: { requiredLength: 10, actualLength: value.length } };
    }

    return null;
  }
}
