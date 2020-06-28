import { DespesasInsertComponent } from './../despesas-insert/despesas-insert.component';
import { DespesasShowComponent } from './../despesas-show/despesas-show.component';


import { Despesas } from 'src/models/despesas/classes/despesa';
import { DespesasService } from './../../../../models/despesas/services/despesas.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { DespesasIndexDataSource } from './despesas-index-datasource';

@Component({
  selector: 'app-despesas-index',
  templateUrl: './despesas-index.component.html',
  styleUrls: ['./despesas-index.component.css']
})
export class DespesasIndexComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Despesas>;
  dataSource: DespesasIndexDataSource;

  constructor(
    private despesasService: DespesasService,
    private dialog: MatDialog
    ){
    this.despesasService.GetAll().subscribe(data => {

      this.dataSource = new DespesasIndexDataSource(data); 
  
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  responseColumns = [
    'Valor',
    'Data',
    'Tipo',
    'Litros',
    'Km',
    'Nome',
  ]
  
  displayedColumns = [...this.responseColumns, 'Acoes'];

  ngOnInit() {}

  handleCel( celName: string, cel: any){

    return cel
  }

  deleteRow(row_id){ 
    this.despesasService.Delete(row_id)
  }
  
  editRow(row){
    let despesa = new Despesas(row)
    this.dialog.open(DespesasInsertComponent, {
      data: {id: row.id, ...despesa}
    });
  }

  open(row){
    let despesa = new Despesas(row)
    this.dialog.open(DespesasShowComponent, {
      data: {id: row.id, ...despesa}
    });
  }
}
