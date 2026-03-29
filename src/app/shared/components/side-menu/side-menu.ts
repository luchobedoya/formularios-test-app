import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { IMenuItem } from '../../../utils/interfaces/IMenuItem';
import { RouterLink, RouterLinkActive } from "@angular/router";


  const reactiveRoute = reactiveRoutes[0].children ?? [];
@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
})
export class SideMenu {

  reactiveMenu: IMenuItem[] = reactiveRoute
  .filter((route) => route.path !== '**')
    .map((route) => {
    return {
      title: (route.title as string) ?? '',
      route: `reactive/${route.path}`
    }
  });

  authMenu: IMenuItem[] = [
    {
      title: 'Registro',
      route: './auth'
    }
  ]

  countryMenu: IMenuItem[] = [
    {
      title: 'Paises',
      route: './country'
    }
  ];


}
