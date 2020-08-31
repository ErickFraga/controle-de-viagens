import { ComponentType } from '@angular/cdk/portal';
import { MotoristasService } from './../../../models/motoristas/services/motoristas.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MotoristasInsertComponent } from "../motoristas-insert/motoristas-insert.component";
@Component({
  selector: 'app-motoristas-crud',
  templateUrl: 'motoristas-crud.component.html'
})

export class MotoristasCrudComponent implements OnInit {
  columns: string[] = [
    'Nome',
    'Foto',
    'Comissao',
  ]
  dataSourceIndex;
  insert:ComponentType<any> = MotoristasInsertComponent;

  constructor(
    public motoristasService: MotoristasService,
    private dialog: MatDialog) { }

  ngOnInit() { 
    this.motoristasService.GetAll().subscribe(x => {
      this.dataSourceIndex = x
    })
  }
  openDialog(): void{
    const dialogRef = this.dialog.open(MotoristasInsertComponent, {
      data: {}
    })
    
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }
}