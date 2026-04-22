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

  /**
   * Maneja el envío del formulario.
   * Actualmente solo imprime los valores del formulario en la consola.
   */
  onSubmit() {
    console.log(this.myForm.value);
  }

  /**
   * Hook de ciclo de vida que se ejecuta después de que la vista del componente se ha inicializado.
   */
   ngAfterViewInit(): void {
    console.log(this.regions());
  }

  /**
   * Efecto que reacciona a los cambios en el formulario.
   * Se encarga de gestionar las suscripciones a los cambios de región y país,
   * y asegura la limpieza de las mismas cuando el efecto se vuelve a ejecutar o se destruye.
   */
  OnFormChanged = effect(( onCleanup ) => {
    const formRegionChanged = this.OnRegionChanged();
    const countrySubscription = this.onCountryChanged();
    onCleanup(() => {
      formRegionChanged?.unsubscribe();
      countrySubscription?.unsubscribe();
      console.log('limpiado');
    })
  })

  /**
   * Escucha los cambios en el campo 'region' del formulario.
   * Cuando cambia la región, reinicia los campos de país y fronteras, y carga los países correspondientes.
   * @returns Una suscripción al observable de cambios de valor de la región.
   */
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

  /**
   * Escucha los cambios en el campo 'country' del formulario.
   * Cuando cambia el país, reinicia el campo de fronteras y carga los países fronterizos.
   * @returns Una suscripción al observable de cambios de valor del país.
   */
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

  /**
   * Extrae la lista de códigos de fronteras de un arreglo de países.
   * @param country Arreglo que contiene la información del país.
   * @returns Un arreglo de strings con los códigos de los países fronterizos.
   */
  extractFronts(country: SmallCountry[]): string[] {
    const { borders = [] } = country[0];
    if (borders.length === 0) return [];
    return borders;
  }

}
