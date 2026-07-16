import { CommonModule } from '@angular/common';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from './../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CategoriaForm } from '../categoria-form/categoria-form';

@Component({
  selector: 'app-categorias',
  imports: [CommonModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias implements OnInit {
  categorias: Categoria[] = [];

  constructor(
    private modalService: MdbModalService,
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
    this.modalService.open(CategoriaForm);
  }
}
