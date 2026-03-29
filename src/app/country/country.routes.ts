import { Routes } from '@angular/router';

export const countryRoutes: Routes = [
  {
    path: '',
    children: [
        {
            path: '',
            title: 'Países',
            loadComponent: () => import('./pages/country-page/country-page')
        },
       
    ]
  }
];

export default countryRoutes;