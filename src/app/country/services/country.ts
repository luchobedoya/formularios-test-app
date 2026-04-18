import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Country {
  baseUrl = 'https://restcountries.com/v3.1';
  http = inject(HttpClient);

  private _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic'
  ]

  getRegions(): string[] {
    return [...this._regions];
  }

  getCountries(region: string): Observable<Country[]> {
    if(!region) return of([]);
    return this.http.get<Country[]>(`${this.baseUrl}/region/${region}?fields=cca3,name,borders`);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`);
  }

  getCountryBorderByCodes(borders: string[]): Observable<Country[]> {
    if(!borders) return of([]);
    return this.http.get<Country[]>(`${this.baseUrl}/alpha?codes=${borders.join(',')}`);  
  }
}
