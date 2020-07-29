import { DespesasService } from '../../despesas/services/despesas.service';
import { Viagem } from '../classes/viagem';
import { Injectable } from '@angular/core';
import { FireStoreService } from '@dev.arlamend7/angular-fire';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class ViagensService extends FireStoreService<Viagem> {
  constructor(public Store: AngularFirestore, private despesasService: DespesasService) {
    super(Store);
    this.SetColletion('Viagem');
  }

  viagemDuration(id_viagem){
    return this.Get(id_viagem).pipe(
      map(
        viagem => {
        }
      )
    )
  }

  getByCaminhao(id_caminhao){
    return this.Query('placa_carreta', '==', id_caminhao)
  }

  formatDate(fristDate:number, lastDate:number) : Number{

    let comparacao = lastDate - fristDate;
    comparacao = comparacao / 1000;
    comparacao = comparacao / 60;
    comparacao = comparacao / 60;
    comparacao = comparacao / 24;
    return Math.round(comparacao);
  }

}

