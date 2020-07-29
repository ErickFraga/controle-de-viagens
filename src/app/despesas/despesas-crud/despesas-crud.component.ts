import { DespesasService } from './../../../models/despesas/services/despesas.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DespesasInsertComponent } from "../despesas-insert/despesas-insert.component";
import { ComponentType } from "@angular/cdk/portal";

@Component({
  selector: 'app-despesas-crud',
  templateUrl: './despesas-crud.component.html',
  styleUrls: ['./despesas-crud.component.css']
})
export class DespesasCrudComponent implements OnInit {
  
  columns: string[] = [
    'Valor',
    'Data',
    'Tipo',
    'Litros',
    'Km',
    'Nome',
  ]

  insert:ComponentType<any> = DespesasInsertComponent;

  constructor( 
    public despesasService: DespesasService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {}
  openDialog(): void{
    const dialogRef = this.dialog.open(DespesasInsertComponent, {      
      data: {}
    })
    
    dialogRef.afterClosed().subscribe(result => {
    })
  }
} 
