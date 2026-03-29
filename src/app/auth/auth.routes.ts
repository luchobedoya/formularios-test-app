import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'sign-up',
            title: 'Registro',
            loadComponent: () => import('./pages/register-page/register-page')
        },
        {
            path: '**',
            redirectTo: 'sign-up'
        }
    ]
  }
];