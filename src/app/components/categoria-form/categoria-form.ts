import { MatDialogRef } from '@angular/material/dialog';
import { Categoria } from './../../models/categoria';
import { CategoriaService } from './../../services/categoria.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-categoria-form',
  imports: [],
  standalone: true,
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css',
})
export class CategoriaForm {
  

  constructor(
    private dialogRef: MatDialogRef<CategoriaForm>
  ) {
    
  }
  cancelar(){
    this.dialogRef.close();
  }
}
