import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  totalProdutos = 0;

  totalCategorias = 0;

  estoqueBaixo = 0;

  valorEstoque = 0;

}