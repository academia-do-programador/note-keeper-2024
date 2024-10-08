import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ListagemCategoriasComponent } from './views/categorias/listar/listagem-categorias.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'categorias', component: ListagemCategoriasComponent },
];
