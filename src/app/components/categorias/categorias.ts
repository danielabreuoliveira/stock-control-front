import { CommonModule } from '@angular/common';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from './../../services/categoria.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoriaForm } from '../categoria-form/categoria-form';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  imports: [CommonModule, MatButtonModule],
  standalone: true,
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias implements OnInit {
  categorias: Categoria[] = [];

  constructor(
    private dialog: MatDialog,
    private categoriaService: CategoriaService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.carregarCategorias();
  }

  abrirModal() {
    const dialogRef = this.dialog.open(CategoriaForm, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.carregarCategorias();
      }
    });
  }

  carregarCategorias() {
    this.categoriaService.listar().subscribe({
      next: (resultado) => {
        this.categorias = resultado;

        this.cd.detectChanges();
      },

      error: (erro) => {
        console.error('Erro:', erro);
      },
    });
  }

editar(categoria: Categoria) {

  this.categoriaService.buscarPorId(categoria.id)
    .subscribe({

      next: (categoriaEncontrada) => {

        const dialogRef = this.dialog.open(CategoriaForm, {
          width: '500px',
          data: categoriaEncontrada
        });


        dialogRef.afterClosed().subscribe(resultado => {

          if (resultado) {
            this.carregarCategorias();
          }

        });

      },

      error: (erro) => {
        console.error('Erro ao buscar categoria:', erro);
      }

    });

}

  excluir(id: number) {
    Swal.fire({
      title: 'Excluir categoria?',
      text: 'Essa ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.categoriaService.excluir(id).subscribe({
          next: () => {
            Swal.fire('Excluída!', 'Categoria removida com sucesso.', 'success');

            this.carregarCategorias();
          },

          error: (erro) => {
            console.error(erro);

            Swal.fire('Erro!', 'Não foi possível excluir a categoria.', 'error');
          },
        });
      }
    });
  }
  buscarPorId(id: number) {
    this.categoriaService.buscarPorId(id).subscribe({
      next: (categoria) => {
        console.log('Categoria encontrada:', categoria);
      },

      error: (erro) => {
        console.error('Erro ao buscar categoria:', erro);
      },
    });
  }
}
