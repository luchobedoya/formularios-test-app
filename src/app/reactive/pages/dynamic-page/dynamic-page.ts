import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
  styleUrl: './dynamic-page.scss',
})
export default class DynamicPage {
  private _fb = inject(FormBuilder);

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

}
