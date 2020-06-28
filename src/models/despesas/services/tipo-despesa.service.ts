import { AngularFirestore } from 'angularfire2/firestore';
import { FireStoreService } from '@dev.arlamend7/angular-fire';
import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class TipoDespesaService extends FireStoreService<any[]>{  
  
  constructor(public Store: AngularFirestore) {
    super(Store);
    this.SetColletion('tipos-despesa')
    
  }
  

}