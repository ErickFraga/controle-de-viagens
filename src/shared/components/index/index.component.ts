import { DataSource } from '@angular/cdk/collections';
import { FireStoreService } from '@dev.arlamend7/angular-fire';
import { Component, ViewChild, Input, AfterViewInit, AfterContentChecked, OnInit, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogConfig, } from "@angular/material/dialog";
import { IndexDataSource } from './index-datasource';
import { ComponentType } from "@angular/cdk/portal";
import { ShowComponent } from "../show/show.component";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  @Input() service: FireStoreService<any>;
  @Input() columns: string[] = [];
  @Input() insertComponent: ComponentType<any>;
  @Input() showComponent: ComponentType<any> = ShowComponent;
  @Input() dataSourceIndex
  @Input() showAction: boolean = true
  @Input() showPaginator: boolean = true
  @Input() arrayLen: number

  dataSource: IndexDataSource;
  displayedColumns: string[];

  constructor(private dialog: MatDialog, private updateDetector: ChangeDetectorRef) {
    this.displayedColumns;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if (changes.dataSourceIndex && this.table) {
      this.dataSource = new IndexDataSource(changes.dataSourceIndex.currentValue);
      this.dataSource.sort = this.sort;
      console.log(this.sort);
      console.log(this.dataSource.sort);
      
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      console.log(changes.dataSourceIndex.currentValue);
    }
  }

  ngAfterViewInit(): void {
    if (this.columns) {
      this.displayedColumns = this.columns.concat('Acoes');
      this.dataSource = new IndexDataSource(this.dataSourceIndex);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      console.log(this.dataSource.data);

    }
  }


  deleteRow(row_id) {
    this.service.Get(row_id).subscribe(x => x)
    if (confirm('Cuidado, deletar um registro que faz parte de outra tabela pode gerar erros!\n E recomendavel apagar registros da tabela viagens apenas')) {
      this.service.Delete(row_id)
    }
  }

  editRow(row) {
    let config = new MatDialogConfig()
    config = {
      height: '98%',
      width: '100vw',
      panelClass: 'full-screen-modal',
      disableClose: true,
      data: { ...row }
    };

    const ref = this.dialog.open(this.insertComponent, config);
    ref.afterClosed().subscribe((result: string) => {

    })
  }

  openRow(row) {
    let config = new MatDialogConfig()
    config = {
      position: {
        top: '10px',
        right: '10px'
      },
      height: '98%',
      width: '100vw',
      panelClass: 'full-screen-modal',
      data: { ...row }
    };


    this.dialog.open(this.showComponent, config);
  }

  handleRow(row, column: string) {
    return row[column.toLocaleLowerCase().replace(/( de )|( da )|( do )|( )/g, '_')]
  }

}
