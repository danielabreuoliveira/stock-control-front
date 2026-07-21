import { CommonModule } from '@angular/common';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from './../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaForm } from '../categoria-form/categoria-form';
import { MatDialog } from '@angular/material/dialog';
import { disabled } from '@angular/forms/signals';

@Component({
  selector: 'app-categorias',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias implements OnInit {
  categorias: Categoria[] = [];

  constructor(
    private dialog: MatDialog,
    private categoriaService: CategoriaService,
  ) {}

  ngOnInit() {
    this.categoriaService.listar().subscribe({
      next: (resultado) => {
        console.log('Resultado', resultado);
        this.categorias = resultado;
        console.log('Quantidade', this.categorias.length);
      },
      error: (erro) => {
        console.error('Erro:', erro);
      },
    });
  }

  abrirModal() {
    this.dialog.open(
      CategoriaForm, {
      width: '500px',
      disableClose: true});
  }
}
