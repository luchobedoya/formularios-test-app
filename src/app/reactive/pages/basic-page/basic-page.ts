import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.html',
  styleUrl: './basic-page.scss',
})
export default class BasicPage {

  private _fb = inject(FormBuilder);

  public myForm = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required,Validators.min(0)]]
  })  

  onSave() {
    console.log(this.myForm.value);
  }

  isValidField( field: string ): boolean | null {
    return !!this.myForm.get(field)?.errors;
  }

  getFieldError(fieldName : string ) {
    if (!this.myForm.get(fieldName)) return;

    const errors = this.myForm.get(fieldName)?.errors ?? {};

    for (const error of Object.keys(errors)) {
      switch (error) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener minimo ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Este campo debe tener un valor minimo de ${errors['min'].min}`;
          default:
          return 'Este campo es invalido';
      }
    }
    return null;
  }

}
