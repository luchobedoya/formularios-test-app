import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.html',
  styleUrl: './country-page.scss',
})
export default class CountryPage {
  fb = inject(FormBuilder);

  myForm = this.fb.group(
    {
      country: ['', Validators.required],
      region: ['', Validators.required],
      borders: ['', Validators.required],
    }
  )

}
