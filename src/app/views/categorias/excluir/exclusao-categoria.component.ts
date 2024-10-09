import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { DetalhesCategoria } from '../models/categoria.models';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-exclusao-categoria',
  standalone: true,
  imports: [NgIf, RouterLink, AsyncPipe, MatButtonModule, MatIconModule],
  templateUrl: './exclusao-categoria.component.html',
  styleUrl: './exclusao-categoria.component.scss',
})
export class ExclusaoCategoriaComponent implements OnInit {
  id?: number;
  categoria$?: Observable<DetalhesCategoria>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (!this.id) {
      console.error('Não foi possível recuperar o id requisitado.');

      return;
    }

    this.categoria$ = this.categoriaService.selecionarPorId(this.id);
  }

  excluir() {
    if (!this.id) {
      console.error('Não foi possível recuperar o id requisitado.');

      return;
    }

    this.categoriaService.excluir(this.id).subscribe((res) => {
      console.log(`O registro ID [${this.id}] foi excluído com sucesso!`);

      this.router.navigate(['/categorias']);
    });
  }
}
