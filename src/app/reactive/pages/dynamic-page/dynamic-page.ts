import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/forms/formUtils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
  styleUrl: './dynamic-page.scss',
})
export default class DynamicPage {
  private _fb = inject(FormBuilder);
  public newFavorite = new FormControl('', Validators.required);
  formUtils = FormUtils;

  public myForm = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this._fb.array([
      [{ value: 'Metal Gear', disabled: true }, Validators.required],
      [{ value: 'Final Fantasy', disabled: true }, Validators.required],
    ], Validators.minLength(2))
  });

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  // isValidFieldInArray(formArray: FormArray, index: number) {
  //   return formArray.controls[index].invalid && formArray.controls[index].touched && formArray.controls[index].errors;
  // }

  
  // getFieldErrorInArray: Verifica si hay errores (como campos vacíos o textos muy cortos) en un elemento específico de una lista.
  getFieldErrorInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors;
  } 

  // addFavoriteGame: Es la acción de "Agregar" a la lista. Lee lo que el usuario escribió, lo mete a la lista de arreglos y limpia el input de texto para que el usuario pueda escribir otro.
  addFavoriteGame() {
    const newGame = this.newFavorite.value; 
    this.favoriteGames.push(this._fb.control({ value: newGame, disabled: true }, Validators.required));
    this.newFavorite.reset();
  } 

  // deleteFavoriteGame: Es la acción del botón "Eliminar". Saca de la lista el elemento que esté en la posición indicada.
  deleteFavoriteGame(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
  }

}
