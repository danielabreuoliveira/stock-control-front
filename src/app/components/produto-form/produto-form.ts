import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { Produto } from '../../models/produto';
import { Categoria } from '../../models/categoria';

import { ProdutoService } from '../../services/produto.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.css',
})
export class ProdutoForm implements OnInit {
  produto: Produto = {
    nome: '',
    descricao: '',
    precoCompra: 0,
    precoVenda: 0,
    estoque: 0,
    codigoBarras: '',
    ativo: true,
    categoriaId: 0,
  };

  categorias: Categoria[] = [];

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private dialogRef: MatDialogRef<ProdutoForm>,

    @Inject(MAT_DIALOG_DATA)
    public data: Produto,
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();

    if (this.data) {
      this.produto = this.data;
    }
  }

  carregarCategorias() {
    this.categoriaService.listar().subscribe({
      next: (resultado) => {
        this.categorias = resultado;
      },

      error: (erro) => {
        console.error(erro);
      },
    });
  }

  salvar() {
    if (!this.produto.nome) {
      alert('Informe o nome do produto.');
      return;
    }

    if (!this.produto.categoriaId) {
      alert('Selecione uma categoria.');
      return;
    }
  }

  cadastrar() {
    this.produtoService.salvar(this.produto).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },

      error: (erro) => {
        console.log(erro);
      },
    });
  }

  atualizar() {
    this.produtoService.atualizar(this.produto.id!, this.produto).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },

      error: (erro) => {
        console.log(erro);
      },
    });
  }
}
