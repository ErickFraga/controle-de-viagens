import { AngularFirestore } from 'angularfire2/firestore';
import { Caminhao } from '../class/caminhao';
import { FireStoreService } from '@dev.arlamend7/angular-fire';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CaminhoesService extends FireStoreService<Caminhao> {
  constructor(public Store: AngularFirestore) {
    super(Store);
    this.SetColletion('Caminhao');
  }
}
