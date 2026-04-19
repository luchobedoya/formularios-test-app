import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.html',
  styleUrl: './country-page.scss',
})
export default class CountryPage implements AfterViewInit {
  fb = inject(FormBuilder);
  countryServices = inject(CountryService);
  regions = signal(this.countryServices.getRegions());
  countriesByRiegrion = signal<Country[]>([]);
  bordersByCountry = signal<Country[]>([]);

  myForm = this.fb.group(
    {
      country: ['', Validators.required],
      region: ['', Validators.required],
      borders: ['', Validators.required],
    }
  );

  onSubmit() {
    console.log(this.myForm.value);
  }

   ngAfterViewInit(): void {
    console.log(this.regions());
  }

}
