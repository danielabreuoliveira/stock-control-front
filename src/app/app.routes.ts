import { Routes } from '@angular/router';

import { Layout } from './layout/layout/layout';
import { Categorias } from './components/categorias/categorias';
import { Produtos } from './components/produtos/produtos';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Dashboard },
      { path: 'categorias', component: Categorias },
      { path: 'produtos', component: Produtos }
    ]
  }
];