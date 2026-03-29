import { Routes } from '@angular/router';

export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'basic',
            title: 'Basico',
            loadComponent: () => import('./pages/basic-page/basic-page')
        },
        {
            path: 'dynamic',
            title: 'Dinamico',
            loadComponent: () => import('./pages/dynamic-page/dynamic-page')
        },
        {
            path: 'switches',
            title: 'Switches',
            loadComponent: () => import('./pages/switches-page/switches-page')
        },
        {
            path: '**',
            redirectTo: 'basic'
        }
    ]
  }
];

export default reactiveRoutes;