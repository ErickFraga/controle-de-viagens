import { Component, Inject} from '@angular/core';
import { FormGroup ,FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Caminhao } from 'src/models/caminhoes/class/caminhao';
import { CaminhoesService } from 'src/models/caminhoes/services/caminhoes.service';
import { CaminhoesCrudComponent } from "../caminhoes-crud/caminhoes-crud.component";

interface DialogCaminhao extends Caminhao {
  id: string;
}

@Component({
  selector: 'app-caminhoes-insert',
  templateUrl: './caminhoes-insert.component.html',
  styleUrls: ['./caminhoes-insert.component.css'],
})
export class CaminhoesInsertComponent {
  addressForm: FormGroup
  id: string

  constructor(
      private fb: FormBuilder,
      private caminhoesService: CaminhoesService,
      public dialogRef: MatDialogRef<CaminhoesCrudComponent>,
      @Inject(MAT_DIALOG_DATA) public dados: DialogCaminhao,
    ) {
      this.id = dados.id || null
 
      this.addressForm = this.fb.group({
        frota: dados.frota,
        placa: dados.placa,
      });
    } 

  onSubmit() {
    if(this.addressForm.status != "INVALID"){

      const frota = this.addressForm.value.frota
      const placa = this.addressForm.value.placa
    

      let caminhao = new Caminhao({
        frota,
        placa
      }); 
      
      if(this.id){
        this.caminhoesService.Update(caminhao, this.id).subscribe(X => {
          this.dialogRef.close();
        })
      }else{
        this.caminhoesService.Insert(caminhao).subscribe(X => {
          this.dialogRef.close();
        })  
      }
    }
  }
}
