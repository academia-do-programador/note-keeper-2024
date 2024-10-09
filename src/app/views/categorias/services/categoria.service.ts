import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import {
  CadastroCategoria,
  CategoriaCriada,
  CategoriaEditada,
  DetalhesCategoria,
  EdicaoCategoria,
  ListagemCategoria,
} from '../models/categoria.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly url = `${environment.API_URL}/categorias`;

  constructor(private http: HttpClient) {}

  cadastrar(novaCategoria: CadastroCategoria): Observable<CategoriaCriada> {
    return this.http.post<CategoriaCriada>(this.url, novaCategoria);
  }

  editar(
    id: number,
    categoriaEditada: EdicaoCategoria
  ): Observable<CategoriaEditada> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http.put<CategoriaEditada>(urlCompleto, categoriaEditada);
  }

  selecionarTodos(): Observable<ListagemCategoria[]> {
    return this.http.get<ListagemCategoria[]>(this.url);
  }

  selecionarPorId(id: number) {
    const urlCompleto = `${this.url}/${id}`;

    return this.http.get<DetalhesCategoria>(urlCompleto);
  }
}
