import { Routes } from '@angular/router';

export const authRoutes: Routes = [
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