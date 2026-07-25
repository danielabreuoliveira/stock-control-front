import { Produto } from './../models/produto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private API = 'http://localhost:8081/produtos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }

  salvar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API, produto);
  }

  atualizar(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.API}/${id}`, produto);
  }

  excluir(id: number) {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.API}/${id}`);
  }

  buscarPorNome(nome: string): Observable<Produto[]> {
  return this.http.get<Produto[]>(`${this.API}/buscar?nome=${nome}`);
}
}
