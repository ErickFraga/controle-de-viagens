// import { DespesasInsertComponent } from './../../components/despesas/despesas-insert/despesas-insert.component';
import { ComponentType } from '@angular/cdk/portal';
import { ViagensService } from './../../../models/viagens/services/viagens.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ViagensInsertComponent } from "../viagens-insert/viagens-insert.component";
@Component({
  selector: 'app-viagens-crud',
  templateUrl: 'viagens-crud.component.html'
})

export class ViagensCrudComponent implements OnInit {
  columns: string[] = [
    'Destino',
    'Motorista',
    'Frete',
    'Adiantamento',
    'Placa da Carreta',
    'Data de Partida',
    'Km de Partida',
  ]

  insert:ComponentType<any> = ViagensInsertComponent 

  constructor(
    public viagensService: ViagensService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {}
  openDialog(): void{
    const dialogRef = this.dialog.open(ViagensInsertComponent, {
      data: {}
    })
     
    dialogRef.afterClosed().subscribe(result => {})
  }
}