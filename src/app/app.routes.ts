import { Routes } from '@angular/router';
import { Categorias } from './components/categorias/categorias';

export const routes: Routes = [
  {
    path: '',
    component: Categorias
  },
  {
    path: 'categorias',
    component: Categorias
  }
];