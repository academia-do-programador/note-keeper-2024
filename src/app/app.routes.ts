import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ListagemCategoriasComponent } from './views/categorias/listar/listagem-categorias.component';
import { CadastroCategoriaComponent } from './views/categorias/cadastrar/cadastro-categoria.component';
import { EdicaoCategoriaComponent } from './views/categorias/editar/edicao-categoria.component';
import { ExclusaoCategoriaComponent } from './views/categorias/excluir/exclusao-categoria.component';
import { notasRoutes } from './views/notas/notas.routes';
import { categoriasRoutes } from './views/categorias/categorias.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'categorias',
    children: categoriasRoutes,
  },
  { path: 'notas', children: notasRoutes },
];
