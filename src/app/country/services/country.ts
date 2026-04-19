import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, catchError } from 'rxjs';

// 1. Definir Tipos Estrictos para las regiones permitidas
export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
  Antarctic = 'Antarctic'
}

// 2. Definir Interfaces que representan exactamente la data que pides
export interface SmallCountry {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  borders: string[]; // Ten en cuenta que algunos países en la API no tienen esta propiedad
}

@Injectable({
  providedIn: 'root',
})
export class CountryService { // 3. Sufijo 'Service' para no chocar con el modelo

  // 4. Privacidad e Inmutabilidad con 'private readonly'
  private readonly baseUrl = 'https://restcountries.com/v3.1';
  private readonly http = inject(HttpClient);

  // Array de regiones tipadas con base al Enum
  private readonly _regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania,
    Region.Antarctic
  ];

  getRegions(): Region[] {
    return [...this._regions];
  }

  // 5. Manejo de Errores con catchError
  getCountries(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);

    return this.http.get<SmallCountry[]>(`${this.baseUrl}/region/${region}?fields=cca3,name,borders`)
      .pipe(
        catchError(error => {
          console.error(`Error obteniendo países de ${region}:`, error);
          return of([]); // Retornamos un arreglo vacío para que la UI no reviente
        })
      );
  }

  getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry[]> {
    return this.http.get<SmallCountry[]>(`${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`)
      .pipe(
        catchError(error => {
          console.error(`Error buscar código ${alphaCode}:`, error);
          return of([]); 
        })
      );
  }

  getCountryBorderByCodes(borders: string[]): Observable<SmallCountry[]> {
    // 6. Validación robusta que también ignora si mandan un arreglo vacío "[]"
    if (!borders || borders.length === 0) return of([]);

    return this.http.get<SmallCountry[]>(`${this.baseUrl}/alpha?codes=${borders.join(',')}`)
      .pipe(
        catchError(error => {
          console.error(`Error obteniendo las fronteras:`, error);
          return of([]);
        })
      );
  }
}
