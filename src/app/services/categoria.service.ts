import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {

  private API = 'http://localhost:8081/categorias';

  constructor(private http: HttpClient){

  }

  listar():  Observable<Categoria[]>{
   return this.http.get<Categoria[]>(this.API)
  }
}

 