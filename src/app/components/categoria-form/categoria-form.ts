import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from './../../models/categoria';
import { CategoriaService } from './../../services/categoria.service';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-categoria-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonModule,
  ],
  standalone: true,
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css',
})
export class CategoriaForm {
  form = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    descricao: new FormControl('', [Validators.minLength(3), Validators.maxLength(255)]),
  });

  constructor(
    private dialogRef: MatDialogRef<CategoriaForm>,
    private categoriaService: CategoriaService,
    @Inject(MAT_DIALOG_DATA) public categoria: Categoria
  ) {
    if (this.categoria){
       this.form.patchValue({
        nome: this.categoria.nome,
        descricao: this.categoria.descricao
       });
    }
   
  }

  cancelar() {
    this.dialogRef.close();
  }

 
  salvar() {

  if (this.form.invalid) {
    return;
  }

  const categoria = this.form.getRawValue() as Categoria;

  const requisicao = this.categoria
      ? this.categoriaService.atualizar(this.categoria.id!, categoria)
      : this.categoriaService.salvar(categoria);

  requisicao.subscribe({

    next: (categoriaSalva) => {
      this.dialogRef.close(categoriaSalva);
    },

    error: (erro) => {
      console.error('Erro ao salvar:', erro);
    }

  });

}
}
