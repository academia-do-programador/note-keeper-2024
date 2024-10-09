import { Routes } from '@angular/router';
import { ListagemNotasComponent } from './listar/listagem-notas.component';

export const notasRoutes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  { path: 'listar', component: ListagemNotasComponent },
];
