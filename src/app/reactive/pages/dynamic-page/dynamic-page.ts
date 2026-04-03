import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/forms/formUtils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
  styleUrl: './dynamic-page.scss',
})
export default class DynamicPage {
  private _fb = inject(FormBuilder);
  formUtils = FormUtils;

  public myForm = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this._fb.array([
      ['Metal Gear', Validators.required],
      ['Final Fantasy', Validators.required],
    ], Validators.minLength(3))
  });

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  // isValidFieldInArray(formArray: FormArray, index: number) {
  //   return formArray.controls[index].invalid && formArray.controls[index].touched && formArray.controls[index].errors;
  // }

  getFieldErrorInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors;
  } 

  addFavoriteGame() {
    const newGame = this._fb.control('', Validators.required);
    this.favoriteGames.push(newGame);
  } 

  deleteFavoriteGame(index: number) {
    this.favoriteGames.removeAt(index);
  }   

}
