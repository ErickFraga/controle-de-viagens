import { Despesas} from './../classes/despesa';
import { AngularFirestore } from 'angularfire2/firestore';
import { FireStoreService } from '@dev.arlamend7/angular-fire';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DespesasService extends FireStoreService<Despesas> {
  constructor(public Store: AngularFirestore) {
    super(Store);
    this.SetColletion('Despesa');
  }

}
