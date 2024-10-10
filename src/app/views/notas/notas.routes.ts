import { Routes } from '@angular/router';
import { ListagemNotasComponent } from './listar/listagem-notas.component';
import { CadastroNotaComponent } from './cadastrar/cadastro-nota.component';
import { EdicaoNotaComponent } from './editar/edicao-nota.component';

export const notasRoutes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  { path: 'listar', component: ListagemNotasComponent },
  { path: 'cadastrar', component: CadastroNotaComponent },
  { path: 'editar/:id', component: EdicaoNotaComponent },
];
