import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CaminhoesInsertComponent } from "../caminhoes-insert/caminhoes-insert.component";
import { CaminhoesService } from "src/models/caminhoes/services/caminhoes.service";
import { ComponentType } from "@angular/cdk/portal";

@Component({
  selector: 'app-caminhoes-crud',
  templateUrl: 'caminhoes-crud.component.html'
})

export class CaminhoesCrudComponent implements OnInit {

  columns: string[] = [
    'Frota',
    'Placa'
  ]

  insert: ComponentType<any> = CaminhoesInsertComponent;

  dataSource: any[];

  constructor(
    public caminhoesService: CaminhoesService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.caminhoesService.GetAll().subscribe(x => this.dataSource = x);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CaminhoesInsertComponent, {
      data: {}
    })

    dialogRef.afterClosed().subscribe(result => { })
  }


}