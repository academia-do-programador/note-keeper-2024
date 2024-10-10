import { NgIf, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DetalhesNota } from '../models/nota.models';
import { NotaService } from '../services/nota.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exclusao-nota',
  standalone: true,
  imports: [NgIf, RouterLink, AsyncPipe, MatButtonModule, MatIconModule],
  templateUrl: './exclusao-nota.component.html',
})
export class ExclusaoNotaComponent implements OnInit {
  id?: number;
  nota$?: Observable<DetalhesNota>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notaService: NotaService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (!this.id) {
      console.error('Não foi possível recuperar o id requisitado.');

      return;
    }

    this.nota$ = this.notaService.selecionarPorId(this.id);
  }

  excluir() {
    if (!this.id) {
      console.error('Não foi possível recuperar o id requisitado.');

      return;
    }

    this.notaService.excluir(this.id).subscribe((res) => {
      console.log(`O registro ID [${this.id}] foi excluído com sucesso!`);

      this.router.navigate(['/notas']);
    });
  }
}
