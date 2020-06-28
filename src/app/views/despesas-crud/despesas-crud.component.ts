import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DespesasInsertComponent } from "../../components/despesas/despesas-insert/despesas-insert.component";


@Component({
  selector: 'app-despesas-crud',
  templateUrl: './despesas-crud.component.html',
  styleUrls: ['./despesas-crud.component.css']
})
export class DespesasCrudComponent implements OnInit {

  constructor( private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(): void{
    const dialogRef = this.dialog.open(DespesasInsertComponent, {data: {}})
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }
} 
