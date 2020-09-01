import { Component, Inject} from '@angular/core';
import { FormGroup ,FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Motorista } from 'src/models/motoristas/classes/motorista';
import { MotoristasService } from 'src/models/motoristas/services/motoristas.service';
import { MotoristasCrudComponent } from "../motoristas-crud/motoristas-crud.component";

interface DialogMotorista extends Motorista {
  id: string;
}

@Component({
  selector: 'app-motoristas-insert',
  templateUrl: './motoristas-insert.component.html',
  styleUrls: ['./motoristas-insert.component.css'],
})
export class MotoristasInsertComponent {
  addressForm: FormGroup
  id: string

  constructor(
      private fb: FormBuilder,
      private motoristasService: MotoristasService,
      public dialogRef: MatDialogRef<MotoristasCrudComponent>,
      @Inject(MAT_DIALOG_DATA) public dados: DialogMotorista,
    ) {
      this.id = dados.id || null
 
      this.addressForm = this.fb.group({
        nome: dados.nome,
        foto: dados.foto || " ",
        comissao: dados.comissao
      });
    } 

  onSubmit() {
    if(this.addressForm.status != "INVALID"){

      const nome = this.addressForm.value.nome
      const foto = this.addressForm.value.foto
      const comissao = this.addressForm.value.comissao

      let motorista = new Motorista({
        nome,
        foto,
        comissao
      }); 
      
      if(this.id){
        this.motoristasService.Update(motorista, this.id).subscribe(X => {
          this.dialogRef.close();
        })
      }else{
        this.motoristasService.Insert(motorista).subscribe(X => {
          this.dialogRef.close();
        })  
      }
    }
  }

  cancel(){
    this.dialogRef.close()
  }
}
