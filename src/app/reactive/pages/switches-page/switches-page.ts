import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/forms/formUtils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.html',
  styleUrl: './switches-page.scss',
})
export default class SwitchesPage {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;


  myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true],
    termsAndConditions: [false, Validators.requiredTrue]
  });

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
