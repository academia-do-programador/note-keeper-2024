import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  CadastroCategoria,
  DetalhesCategoria,
  EdicaoCategoria,
} from '../models/categoria.models';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-edicao-categoria',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './edicao-categoria.component.html',
})
export class EdicaoCategoriaComponent implements OnInit {
  id?: number;
  categoriaForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService
  ) {
    this.categoriaForm = new FormGroup({
      titulo: new FormControl<string>(''),
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (!this.id) {
      console.error('Não foi possível recuperar o id requisitado.');

      return;
    }

    this.categoriaService
      .selecionarPorId(this.id)
      .subscribe((res) => this.carregarFormulario(res));
  }

  editar() {
    if (!this.id) {
      console.error('Não foi possível recuperar o id requisitado.');

      return;
    }

    const categoriaEditada: EdicaoCategoria = this.categoriaForm.value;

    this.categoriaService.editar(this.id, categoriaEditada).subscribe((res) => {
      console.log(`O registro ID [${res.id}] foi editado com sucesso!`);

      this.router.navigate(['/categorias']);
    });
  }

  private carregarFormulario(registro: DetalhesCategoria) {
    this.categoriaForm.patchValue(registro);
  }
}
