import { materializeModule } from './../../shared/materialize.module';
import { SharedModule } from './../../shared/shared.module';
import { DespesasInsertComponent } from './despesas-insert/despesas-insert.component';
import { DespesasCrudComponent } from './despesas-crud/despesas-crud.component';
import { DespesasRoutingModule } from './despesas-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations:[
    DespesasCrudComponent,
    DespesasInsertComponent,],
  imports:[
    DespesasRoutingModule,
    SharedModule,
  ]
})
export class DespesasModule{}