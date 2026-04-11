import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.formUtils.notOnlySpacesPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  })

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
