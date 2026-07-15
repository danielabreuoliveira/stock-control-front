import { CommonModule } from '@angular/common';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from './../../services/categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias',
  imports: [CommonModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias implements OnInit {

  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService){

  }

  ngOnInit(){
     console.log("COMPONENTE CATEGORIAS CARREGADO");

    this.categoriaService.listar().subscribe(resultado =>{

        this.categorias = resultado;
    });
  } 
}
