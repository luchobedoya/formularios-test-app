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
  borders?: string[]; // Ten en cuenta que algunos países en la API no tienen esta propiedad
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

  /**
   * Obtiene la lista de regiones disponibles.
   * @returns Un arreglo con las regiones definidas en el enum Region.
   */
  getRegions(): Region[] {
    return [...this._regions];
  }

  // 5. Manejo de Errores con catchError
  /**
   * Obtiene la lista de países pertenecientes a una región específica.
   * @param region La región por la cual filtrar los países.
   * @returns Un Observable que emite un arreglo de objetos SmallCountry.
   */
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

  /**
   * Busca la información de un país utilizando su código alfa (cca3).
   * @param alphaCode El código alfa del país a buscar.
   * @returns Un Observable que emite un arreglo con la información del país encontrado.
   */
  getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry[]> {
    return this.http.get<SmallCountry[]>(`${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`)
      .pipe(
        catchError(error => {
          console.error(`Error buscar código ${alphaCode}:`, error);
          return of([]); 
        })
      );
  }

  /**
   * Obtiene la información básica de los países que son frontera de los países proporcionados.
   * @param country Arreglo de países de los cuales se extraerán los códigos de fronteras.
   * @returns Un Observable que emite un arreglo de SmallCountry con la información de las fronteras.
   */
  getCountryBorderByCodes(country: SmallCountry[]): Observable<SmallCountry[]> {  
    const borders: string[] = [];
    country.forEach((element: SmallCountry) => {
      if (element.borders) {
        borders.push(...element.borders);
      }
    });
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
