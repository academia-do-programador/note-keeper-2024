import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ListagemNota } from '../models/nota.models';
import { NotaService } from '../services/nota.service';
import { MatChipsModule } from '@angular/material/chips';
import { CategoriaService } from '../../categorias/services/categoria.service';
import { ListagemCategoria } from '../../categorias/models/categoria.models';

@Component({
  selector: 'app-listagem-notas',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
  ],
  templateUrl: './listagem-notas.component.html',
  styleUrl: './listagem-notas.component.scss',
})
export class ListagemNotasComponent implements OnInit {
  notas$?: Observable<ListagemNota[]>;
  categorias$?: Observable<ListagemCategoria[]>;

  notasEmCache: ListagemNota[];

  constructor(
    private notaService: NotaService,
    private categoriaService: CategoriaService
  ) {
    this.notasEmCache = [];
  }

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.selecionarTodos();

    this.notaService.selecionarTodos().subscribe((notas) => {
      this.notasEmCache = notas;

      this.notas$ = of(notas);
    });
  }

  filtrar(categoriaId?: number) {
    const notasFiltradas = this.obterNotasFiltradas(
      this.notasEmCache,
      categoriaId
    );

    this.notas$ = of(notasFiltradas);
  }

  private obterNotasFiltradas(notas: ListagemNota[], categoriaId?: number) {
    if (categoriaId) {
      return notas.filter((n) => n.categoriaId == categoriaId);
    }

    return notas;
  }
}
