import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService, Region, SmallCountry } from '../../services/country';
import { count, filter, of, switchMap, tap } from 'rxjs';

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
  countriesByRegion = signal<SmallCountry[]>([]);
  bordersByCountry = signal<SmallCountry[]>([]);

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
    const countrySubscription = this.onCountryChanged();
    onCleanup(() => {
      formRegionChanged?.unsubscribe();
      countrySubscription?.unsubscribe();
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

  onCountryChanged() {
    return this.myForm.get('country')?.valueChanges
    .pipe(
      tap(() => this.myForm.get('borders')?.reset('')),
      filter((country) => country!.length > 0),
      tap(() => {
        this.bordersByCountry.set([]);
      }
    ),
      switchMap((alphaCode) => this.countryServices.getCountryByAlphaCode(alphaCode as string)),
      switchMap((country) => {
        console.log(country);
        return this.countryServices.getCountryBorderByCodes(country)
      }),
      tap((country) => this.bordersByCountry.set(country)),
      tap((country) => console.log(country)),
    ).subscribe(country => {
        console.log(country);
        this.bordersByCountry.set(country);
    });
  } 

  extractFronts(country: SmallCountry[]): string[] {
    const { borders = [] } = country[0];
    if (borders.length === 0) return [];
    return borders;
  }

}
