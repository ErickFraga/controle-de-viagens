import { Component, Inject, LOCALE_ID} from '@angular/core';
import { FormGroup ,FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MAT_DATE_LOCALE, DateAdapter } from "@angular/material/core"

import { Viagem } from 'src/models/viagens/classes/viagem';
import { ViagensService } from 'src/models/viagens/services/viagens.service';
import { ViagensCrudComponent } from "src/app/viagens/viagens-crud/viagens-crud.component";

import { MotoristasService } from 'src/models/motoristas/services/motoristas.service';
import { MotoristasInsertComponent } from "src/app/motoristas/motoristas-insert/motoristas-insert.component";

import { CaminhoesService } from 'src/models/caminhoes/services/caminhoes.service';
import { CaminhoesInsertComponent } from "src/app/caminhoes/caminhoes-insert/caminhoes-insert.component";

import { DespesasInsertComponent } from "src/app/despesas/despesas-insert/despesas-insert.component";

@Component({
  selector: 'app-viagens-insert',
  templateUrl: './viagens-insert.component.html',
  styleUrls: ['./viagens-insert.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    { provide: LOCALE_ID, useValue: "pt-BR" } 
  ],
})
export class ViagensInsertComponent {
  addressForm: FormGroup
  id: string

  motoristas: string[] = [];
  caminhoes: string[] = [];
  
  despesas: string[] = [];

  constructor(
      private fb: FormBuilder,
      private viagensService: ViagensService,
      private motoristasService: MotoristasService,
      private caminhoesService: CaminhoesService,
      private dialog: MatDialog,
      public dialogRef: MatDialogRef<ViagensCrudComponent>,
      private dateAdapter: DateAdapter<any>,
      @Inject(MAT_DIALOG_DATA) public dados: Viagem,
    ){ 
      this.dateAdapter.setLocale('pt-br')

      this.id = dados.id || null

      if(dados.despesas != undefined){
        this.despesas = dados.despesas
      }

      

      this.addressForm = this.fb.group({
        destino : dados.destino,
        motorista : [dados.motorista, Validators.required],
        frete : dados.frete,
        adiantamento : dados.adiantamento || undefined,
        placa_carreta : [dados.placa_carreta, Validators.required],
        data_partida : this.LocaleStrignToDate(dados.data_partida),
        data_chegada : this.LocaleStrignToDate(dados.data_chegada) || undefined,
        km_partida : dados.km_partida,
        km_chegada : dados.km_chegada || undefined,
        obs : dados.obs || '',
        despesas: this.despesas,
      });

      this.motoristasService.GetAll().subscribe((x:any) => {
        console.log(x);
        this.motoristas.push(...x);
      })

      this.caminhoesService.GetAll().subscribe((x:any) => {
        console.log(x);
        this.caminhoes.push(...x);
      })

    } 
 
  onSubmit() {
    if(this.addressForm.status != "INVALID"){
      const destino = this.addressForm.value.destino;
      const motorista = this.addressForm.value.motorista; // select
      const frete = this.addressForm.value.frete; 
      const placa_carreta = this.addressForm.value.placa_carreta; // select
      const adiantamento = this.addressForm.value.adiantamento;
      const data_partida = this.addressForm.value.data_partida.toLocaleDateString();
      const data_chegada = this.addressForm.value.data_chegada.toLocaleDateString();
      const km_partida = this.addressForm.value.km_partida;
      const km_chegada = this.addressForm.value.km_chegada;
      const obs = this.addressForm.value.obs;
      const despesas = this.despesas;

      let viagem = new Viagem({
        destino,
        motorista,
        frete,
        adiantamento,
        placa_carreta,
        data_partida,
        data_chegada,
        km_partida,
        km_chegada,
        obs,
        despesas
      }); 
      
      if(this.id){
        this.viagensService.Update(viagem, this.id).subscribe(X => {
          this.dialogRef.close();
        })
      }else{
        this.viagensService.Insert(viagem).subscribe(X => {
          this.dialogRef.close();
        })  
      }
    }
  }


  addMorotista(){ 
    const dialogRef = this.dialog.open(MotoristasInsertComponent, {
      data: {}
    })
    
    dialogRef.afterClosed().subscribe(result => {})
  }

  addCaminhao(){ 
    const dialogRef = this.dialog.open(CaminhoesInsertComponent, {
      data: {}
    })
    
    dialogRef.afterClosed().subscribe(result => {})
  }

  addDespesa(){
    const dialogRef = this.dialog.open(DespesasInsertComponent ,{
      data: {}
    })

    dialogRef.afterClosed().subscribe((result : string)=> {
      console.log(this.despesas)
      console.log(this.addressForm.value)
      if(result != null){
        this.despesas.push(result)
      }
    })
  }

  LocaleStrignToDate(date: string): Date {
    let parsedDate;
    if(date){
      parsedDate = date.split('/')
      return new Date(`${parsedDate[1]}/${parsedDate[0]}/${parsedDate[2]}`)
    }else{
      return new Date();
    }

  }

}
