import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/forms/formUtils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export default class RegisterPage {
  fb = inject(FormBuilder);
  formUtils = FormUtils;

  public myForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.formUtils.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)], [this.formUtils.checkingServerResponse]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.formUtils.notOnlySpacesPattern), this.formUtils.notStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  }, {
    validators: [this.formUtils.isFieldOneEqualFieldTwo('password', 'password2')],
  }
)

  // isFieldOneEqualFieldTwo(field1: string, field2: string) {
  //   return (formGroup: AbstractControl) => {
  //     const field1Value = formGroup.get(field1)?.value;
  //     const field2Value = formGroup.get(field2)?.value;

  //     if (field1Value !== field2Value) {
  //       return {
  //         passwordNotMatch: true
  //       }
  //     }
  //     return null;
  //   }
  // }

  onSubmit() {
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) {
      alert('Formulario invalido');
      return;
    }
    this.myForm.reset();
  }
}
