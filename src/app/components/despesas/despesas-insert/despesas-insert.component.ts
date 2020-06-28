import { Despesas } from './../../../../models/despesas/classes/despesa';
import { DespesasService } from './../../../../models/despesas/services/despesas.service';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormGroup ,FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_DATE_LOCALE, DateAdapter } from "@angular/material/core"
import { DespesasCrudComponent } from "../../../views/despesas-crud/despesas-crud.component";

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

  tipos: string[]= localStorage.getItem('tipos-despesa').split(',')
  selectedTipo: string 

  constructor(
      private fb: FormBuilder,
      private despesasService: DespesasService,
      public dialogRef: MatDialogRef<DespesasCrudComponent>,
      @Inject(MAT_DIALOG_DATA) public dados: DialogDespesa,
      private dateAdapter: DateAdapter<any>
    ) {
      this.dateAdapter.setLocale('pt-br')
      let FormDate 
      let paserdDate
      this.id = dados.id || null
      
    
      
      dados.data? paserdDate = dados.data.split('/'): false

      dados.data? FormDate = new Date(`${paserdDate[1]}/${paserdDate[0]}/${paserdDate[2]}`): FormDate = new Date() 

      this.addressForm = this.fb.group({
        valor: dados.valor || null,
        data: FormDate,
        tipo: [dados.tipo, Validators.required],
        nome: dados.nome || null,
        litros: dados.litros || null,
        km: dados.km || null,
      });

    } 

  onSubmit() {
    if(this.addressForm.status != "INVALID"){
        
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
      
      if((tipo == this.tipos[this.tipos.length - 1] || tipo == this.tipos[this.tipos.length - 3]) && nome != null){
        despesa.nome = nome;
        if(tipo == this.tipos[this.tipos.length - 3] && litros != null && km != null){
          despesa.litros = litros
          despesa.km = km
        } 
      }
      
      
      if(this.id){
        this.despesasService.Update(despesa, this.id).subscribe(X => {
          this.dialogRef.close();
        })
      }else{
        this.despesasService.Insert(despesa).subscribe(X => {
          this.dialogRef.close();
        })  
      }
    }
  }

  isCombustivel(){
    return this.addressForm.controls.tipo.value == this.tipos[this.tipos.length - 3]
  }

  isOutros(){
    return this.addressForm.controls.tipo.value == this.tipos[this.tipos.length - 1] 
  }
}
