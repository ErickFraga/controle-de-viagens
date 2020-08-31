import { DespesasService } from './../../../models/despesas/services/despesas.service';
import { Despesas } from 'src/models/despesas/classes/despesa';
import { Motorista } from 'src/models/motoristas/classes/motorista';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-viagens-insert',
  templateUrl: './viagens-insert.component.html',
  styleUrls: ['./viagens-insert.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ],
})
export class ViagensInsertComponent implements OnInit {
  addressForm: FormGroup
  id: string

  motoristas: string[] = [];
  caminhoes: string[] = [];

  despesas: string[] = [];

  despesasSave: string[] = []

  columns: string[] = [
    'Valor',
    'Data',
    'Tipo',
    'Litros',
    'Km',
    'Nome',
  ]
  insert: ComponentType<any> = DespesasInsertComponent
  despesasSource: Despesas[] = [];

  constructor(
    private fb: FormBuilder,
    private viagensService: ViagensService,
    private motoristasService: MotoristasService,
    private caminhoesService: CaminhoesService,
    public despesasService: DespesasService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ViagensCrudComponent>,
    private dateAdapter: DateAdapter<any>,
    @Inject(MAT_DIALOG_DATA) public dados: Viagem,
  ) {



    this.dateAdapter.setLocale('pt-br')

    this.id = dados.id || null

    if (dados.despesas != undefined) {
      this.despesas = dados.despesas
    }

    if (dados.motorista) {
      motoristasService.Query('nome', '==', dados.motorista).subscribe(x => {
        if (x != []) {
          dados.motorista = x[0].id
        }
      })
    }
    if (dados.placa_carreta) {
      caminhoesService.Query('placa', '==', dados.placa_carreta).subscribe(x => {
        if (x != []) {
          dados.placa_carreta = x[0].id
        }
      })
    }

    this.addressForm = this.fb.group({
      chegada: [dados.chegada],
      partida: [dados.partida],
      motorista: [dados.motorista],
      frete: [dados.frete],
      adiantamento: [dados.adiantamento || undefined],
      placa_carreta: [dados.placa_carreta],
      data_partida: [this.LocaleStrignToDate(dados.data_partida)],
      data_chegada: [this.LocaleStrignToDate(dados.data_chegada) || undefined],
      km_partida: [dados.km_partida],
      km_chegada: [dados.km_chegada || undefined],
      obs: [dados.obs || ''],
      despesas: [this.despesas],
    });

    this.motoristasService.GetAll().subscribe((x: any) => {
      console.log(x);
      this.motoristas.push(...x);
    })

    this.caminhoesService.GetAll().subscribe((x: any) => {
      console.log(x);
      this.caminhoes.push(...x);
    })
    /*
    this.despesas.forEach(id_despesa => {
      this.despesasService.Get(id_despesa).subscribe(despesa => {
        this.despesasSource = []
        console.log(despesa);
        this.despesasSource.push(despesa);
      })
    })
    */
  }
  ngOnInit(): void {
    console.log('asdasd')
    this.updateDespesaSource();
    /*
    this.despesasService.GetGroupById(this.despesas).subscribe(x => {
      console.log(x)
    })
    */
  }

  onSubmit() {
    if (this.addressForm.status != "INVALID") {
      const chegada = this.addressForm.value.chegada;
      const partida = this.addressForm.value.partida;
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
        chegada,
        partida,
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

      if (this.id) {
        this.viagensService.Update(viagem, this.id).subscribe(X => {
          console.log('editou');
          this.dialogRef.close(this.id);
        })
      } else {
        this.viagensService.Insert(viagem).subscribe(X => {
          console.log('inseriu');
          this.dialogRef.close(X.id);
        })
      }
    }
  }


  addMorotista() {
    const dialogRef = this.dialog.open(MotoristasInsertComponent, {
      data: {}
    })

    dialogRef.afterClosed().subscribe(result => { })
  }

  addCaminhao() {
    const dialogRef = this.dialog.open(CaminhoesInsertComponent, {
      data: {}
    })

    dialogRef.afterClosed().subscribe(result => { })
  }

  addDespesa() {
    const dialogRef = this.dialog.open(DespesasInsertComponent, {
      data: {}
    })

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log(this.despesas)
      console.log(this.addressForm.value)
      if (result != null) {
        this.despesas.push(result)
        this.despesasSave.push(result)
        this.updateDespesaSource();
      }
    })
  }

  editDespesa(despesa) {
    console.log(despesa.id);

    const dialogRef = this.dialog.open(this.insert, {
      data: { ...despesa }
    })
    console.log(this.despesasSource);
    console.log(this.despesas);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result != null) {
        this.despesasSource = [];
        this.updateDespesaSource();
      }
    })
  }

  deletDespesa(despesa: Despesas) {
    this.despesasService.Delete(despesa.id).subscribe(xis => {

      this.despesas = [...this.despesas.filter(x => x != despesa.id)]
      this.despesasSource = [...this.despesasSource.filter(x => x.id != despesa.id)]
    })
  }

  updateDespesaSource() {
    this.despesasSource = [];
    this.despesas.forEach(id_despesa => {
      this.despesasService.Get(id_despesa).subscribe(despesa => {
        console.log(despesa);
        this.despesasSource.push({ ...despesa, id: id_despesa });
      })
    })
  }

  LocaleStrignToDate(date: string): Date {
    let parsedDate;
    if (date) {
      parsedDate = date.split('/')
      return new Date(`${parsedDate[1]}/${parsedDate[0]}/${parsedDate[2]}`)
    } else {
      return new Date();
    }

  }

  cancel() {
    this.despesasSave.forEach(x => this.despesasService.Delete(x))
    this.dialogRef.close()
  }

}
