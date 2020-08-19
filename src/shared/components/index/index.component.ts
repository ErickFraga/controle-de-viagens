import { FireStoreService } from '@dev.arlamend7/angular-fire';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog, } from "@angular/material/dialog";
import { IndexDataSource } from './index-datasource';
import { ComponentType } from "@angular/cdk/portal";

import { ShowComponent } from "../show/show.component";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  @Input() service: FireStoreService<any>;
  @Input() columns: string[] = [];
  @Input() insertComponent: ComponentType<any>;
  @Input() showComponent: ComponentType<any> = ShowComponent;


  dataSource: IndexDataSource;
  displayedColumns: string[];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.displayedColumns = this.columns.concat('Acoes');
    this.service.GetAll().subscribe(data => {
      console.log(data);

      this.dataSource = new IndexDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })

  }

  deleteRow(row_id) {
    this.service.Delete(row_id)
  }

  editRow(row) {
    console.log('asdasdasdasdasdasdas');
    console.log(this.insertComponent);

    this.dialog.open(this.insertComponent, {
      data: { ...row }
    });
  }

  openRow(row) {
    this.dialog.open(this.showComponent, {
      data: { ...row }
    });
  }

  handleRow(row, column: string) {
    return row[column.toLocaleLowerCase().replace(/( de )|( da )|( do )|( )/g, '_')]
  }

}
