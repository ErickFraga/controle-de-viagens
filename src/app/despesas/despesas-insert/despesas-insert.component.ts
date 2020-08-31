import { Despesas } from 'src/models/despesas/classes/despesa';
import { DespesasService } from 'src/models/despesas/services/despesas.service';
import { TipoDespesaService } from 'src/models/despesas/services/tipo-despesa.service';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_DATE_LOCALE, DateAdapter } from "@angular/material/core"
import { DespesasCrudComponent } from "../despesas-crud/despesas-crud.component";

interface DialogDespesa extends Despesas {
  id: string;
}

@Component({
  selector: 'app-despesas-insert',
  templateUrl: './despesas-insert.component.html',
  styleUrls: ['./despesas-insert.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ],
})
export class DespesasInsertComponent {
  addressForm: FormGroup

  id: string

  tipos: string[] = [];
  selectedTipo: string

  constructor(
    private fb: FormBuilder,
    private despesasService: DespesasService,
    private tipoDespesaService: TipoDespesaService,
    public dialogRef: MatDialogRef<DespesasCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: DialogDespesa,
    private dateAdapter: DateAdapter<any>
  ) {
    this.dateAdapter.setLocale('pt-br')
    let FormDate
    let parsedDate
    this.id = dados.id || null

    this.tipoDespesaService.GetAll().subscribe(
      (x: any) => {
        this.tipos.push(...x[0].value)
      })

    dados.data ? parsedDate = dados.data.split('/') : false

    dados.data ? FormDate = new Date(`${parsedDate[1]}/${parsedDate[0]}/${parsedDate[2]}`) : FormDate = new Date()

    this.addressForm = this.fb.group({
      valor: [dados.valor || 0],
      data: [FormDate],
      tipo: [dados.tipo, Validators.required],
      nome: [dados.nome || null],
      litros: [dados.litros || 0],
      km: [dados.km || 0],
    });

  }

  onSubmit() {
    console.log(this.addressForm.status);

    if (this.addressForm.status != "INVALID") {

      const valor = this.addressForm.value.valor
      const data: string = this.addressForm.value.data.toLocaleDateString()
      const tipo = this.addressForm.value.tipo
      const nome = this.addressForm.value.nome
      const litros = this.addressForm.value.litros
      const km = this.addressForm.value.km

      let despesa = new Despesas({
        valor: valor,
        data: data,
        tipo: tipo,
        nome: null,
        litros: null,
        km: null
      });

      if ((tipo == this.tipos[this.tipos.length - 1] || tipo == this.tipos[this.tipos.length - 3]) && nome != null) {
        despesa.nome = nome;
        if (tipo == this.tipos[this.tipos.length - 3] && litros != null && km != null) {
          despesa.litros = litros
          despesa.km = km
        }
      }


      if (this.id) {
        this.despesasService.Update(despesa, this.id).subscribe(X => {
          console.log('editou');
          this.dialogRef.close(this.id);
        })
      } else {
        this.despesasService.Insert(despesa).subscribe(X => {
          console.log('inseriu');

          this.dialogRef.close(X.id);
        })
      }
    }
  }

  isCombustivel() {
    return this.addressForm.controls.tipo.value == this.tipos[this.tipos.length - 3]
  }

  isOutros() {
    return this.addressForm.controls.tipo.value == this.tipos[this.tipos.length - 1]
  }
}
