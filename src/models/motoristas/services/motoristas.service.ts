import { Motorista } from '../classes/motorista';
import { FireStoreService } from '@dev.arlamend7/angular-fire';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MotoristasService extends FireStoreService<Motorista> {
  constructor(public Store: AngularFirestore) {
    super(Store);
    this.SetColletion('Motorista');
  }
}
