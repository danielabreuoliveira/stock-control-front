import { Routes } from '@angular/router';
import { Categorias } from './components/categorias/categorias';
import { Produtos } from './components/produtos/produtos';

export const routes: Routes = [
  {
    path: 'categorias',
    component: Categorias
  },
  {
    path: 'produtos',
    component: Produtos
  }
];