import { MatDialogRef } from '@angular/material/dialog';
import { Categoria } from './../../models/categoria';
import { CategoriaService } from './../../services/categoria.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-categoria-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css',
})
export class CategoriaForm {
  
  form = new FormGroup({
    nome: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(100)]),
    descricao: new FormControl('',[Validators.minLength(3),Validators.maxLength(255)])
  })

  constructor(
    private dialogRef: MatDialogRef<CategoriaForm>
  ) {
    
  }
  cancelar(){
    this.dialogRef.close();
  }
}
