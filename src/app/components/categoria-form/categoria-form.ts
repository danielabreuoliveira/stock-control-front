import { MatDialogRef } from '@angular/material/dialog';
import { Categoria } from './../../models/categoria';
import { CategoriaService } from './../../services/categoria.service';
import { Component } from '@angular/core';
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
  ) {}

  cancelar() {
    this.dialogRef.close();
  }

  salvar() {
    if (this.form.invalid) {
      return;
    }

    this.categoriaService.salvar(this.form.getRawValue() as Categoria).subscribe({
      next: (categoriaSalva) => {
        this.dialogRef.close(categoriaSalva);
      },

      error: (erro) => {
        console.error('Erro ao salvar:', erro);
      },
    });
  }
}
