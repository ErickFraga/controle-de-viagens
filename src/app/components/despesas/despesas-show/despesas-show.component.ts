import { DespesasService } from './../../../../models/despesas/services/despesas.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Despesas } from './../../../../models/despesas/classes/despesa';

interface DialogDespesa extends Despesas {
  id: string;
}

@Component({
  selector: 'app-despesas-show',
  templateUrl: './despesas-show.component.html',
  styleUrls: ['./despesas-show.component.css']
})
export class DespesasShowComponent implements OnInit {
  dadosKeys: any

  constructor(
    private despesasService: DespesasService,
    @Inject(MAT_DIALOG_DATA) public dados: DialogDespesa,
  ) {
    this.dadosKeys = Object.keys(dados)
  }

  ngOnInit(): void {
  }

  deleteRow(row_id){ 
    this.despesasService.Delete(row_id)
  }

  editRow(row){}
  

}
