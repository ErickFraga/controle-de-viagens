import { Despesas } from './../classes/despesa';
import { AngularFirestore } from 'angularfire2/firestore';
import { FireStoreService } from '@dev.arlamend7/angular-fire';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DespesasService extends FireStoreService<Despesas> {
  constructor(public Store: AngularFirestore) {
    super(Store);
    this.SetColletion('Despesa');
  }

  GetGroupById(ids_despesas: string[]) {
    //forkJoin(ids_despesas.map(x => this.Get(x)))
    return forkJoin(ids_despesas.map(x => this.Get(x)))
  }

}
