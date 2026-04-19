import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService, Region } from '../../services/country';
import { Country } from '../../interfaces/country.interface';
import { count, switchMap, tap } from 'rxjs';

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
  countriesByRegion = signal<Country[]>([]);
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

  OnFormChanged = effect(( onCleanup ) => {
    const formRegionChanged = this.OnRegionChanged();
    onCleanup(() => {
      formRegionChanged?.unsubscribe();
      console.log('limpiado');
    })
  })

  OnRegionChanged() {
    return this.myForm.get('region')?.valueChanges
    .pipe(
      tap(() => this.myForm.get('country')?.reset('')),
      tap(() => this.myForm.get('borders')?.reset('')),
      tap(() => {
        this.bordersByCountry.set([]);
        this.countriesByRegion.set([]);
      }),
      switchMap((region) => this.countryServices.getCountries(region as Region)),
      tap((countries) => this.countriesByRegion.set(countries))
    ).subscribe(countries => {
        console.log(countries);
        this.countriesByRegion.set(countries);
    });
  }

}
