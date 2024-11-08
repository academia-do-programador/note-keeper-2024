import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./views/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./views/categorias/categorias.routes').then(
        (m) => m.categoriasRoutes
      ),
  },
  {
    path: 'notas',
    loadChildren: () =>
      import('./views/notas/notas.routes').then((m) => m.notasRoutes),
  },
];
