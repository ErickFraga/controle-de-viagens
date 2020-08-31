import { DespesasService } from './../../../models/despesas/services/despesas.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from "@angular/material/dialog";
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

  insert: ComponentType<any> = DespesasInsertComponent;
  dataSource: any[];
  constructor(
    public despesasService: DespesasService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.despesasService.GetAll().subscribe(x => this.dataSource = x);
  }
  openDialog(): void {
    let config = new MatDialogConfig()

    config = {
      position: {
        top: '10px',
        right: '10px'
      },
      height: '98%',
      width: '100vw',
      panelClass: 'full-screen-modal',
      disableClose: true,
      data: {}
    };
    const dialogRef = this.dialog.open(DespesasInsertComponent, config)

    dialogRef.afterClosed().subscribe(result => {
    })
  }
} 
