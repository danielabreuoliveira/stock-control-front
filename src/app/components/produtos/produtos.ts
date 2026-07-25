import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { ProdutoForm } from '../produto-form/produto-form';

@Component({
  selector: 'app-produtos',
  imports: [CommonModule, MatButtonModule, FormsModule],
  standalone: true,
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class Produtos implements OnInit {
  produtos: Produto[] = [];

  filtro: string = '';

  constructor(
    private dialog: MatDialog,
    private produtoService: ProdutoService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  abrirModal() {
    const dialogRef = this.dialog.open(ProdutoForm, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.carregarProdutos();
      }
    });
  }

carregarProdutos() {
  this.produtoService.listar().subscribe({
    next: (resultado) => {
      console.log('Produtos recebidos:', resultado);

      this.produtos = resultado;

      this.cd.detectChanges();
    },

    error: (erro) => {
      console.error('Erro ao listar produtos:', erro);
    },
  });
}

  editar(produto: Produto) {
    this.produtoService.buscarPorId(produto.id!).subscribe({
      next: (produtoEncontrado) => {
        const dialogRef = this.dialog.open(ProdutoForm, {
          width: '500px',
          data: produtoEncontrado,
        });

        dialogRef.afterClosed().subscribe((resultado) => {
          if (resultado) {
            this.carregarProdutos();
          }
        });
      },

      error: (erro) => {
        console.error('Erro ao buscar produto:', erro);
      },
    });
  }

  excluir(id: number) {
    Swal.fire({
      title: 'Excluir produto?',
      text: 'Essa ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.produtoService.excluir(id).subscribe({
          next: () => {
            Swal.fire('Excluído!', 'produto removido com sucesso.', 'success');

            this.carregarProdutos();
          },

          error: (erro) => {
            console.error(erro);

            Swal.fire('Erro!', 'Não foi possível excluir o produto.', 'error');
          },
        });
      }
    });
  }
  buscarPorId(id: number) {
    this.produtoService.buscarPorId(id).subscribe({
      next: (produto) => {
        console.log('produto encontrado:', produto);
      },

      error: (erro) => {
        console.error('Erro ao buscar produto:', erro);
      },
    });
  }



}
