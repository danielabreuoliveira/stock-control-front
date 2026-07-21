import { CommonModule } from '@angular/common';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from './../../services/categoria.service';
import { Component, Inject, OnInit } from '@angular/core';
import { CategoriaForm } from '../categoria-form/categoria-form';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


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
  ) {
  }

  ngOnInit() {
    console.log('Categorias iniciou');
    this.carregarCategorias();
  }

  abrirModal() {
    const dialogRef = this.dialog.open(CategoriaForm,{ 
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        console.log('Recarregando categorias...');
        this.carregarCategorias();
      }
    });
  }

  carregarCategorias() {
    this.categoriaService.listar().subscribe({
      next: (resultado) => {
        this.categorias = resultado;
      },

      error: (erro) => {
        console.error('Erro:', erro);
      },
    });
  }

  editar(categoria: Categoria) {

  const dialogRef = this.dialog.open(CategoriaForm, {
    width: '500px',
    data: categoria
  });

  dialogRef.afterClosed().subscribe(resultado => {

    if (resultado) {
      this.carregarCategorias();
    }

  });

}
}
