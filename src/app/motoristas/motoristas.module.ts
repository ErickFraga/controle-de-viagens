import { materializeModule } from './../../shared/materialize.module';
import { SharedModule } from './../../shared/shared.module';
import { MotoristasInsertComponent } from './motoristas-insert/motoristas-insert.component';
import { MotoristasCrudComponent } from './motoristas-crud/motoristas-crud.component';
import { MotoristasRoutingModule } from './motoristas-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations:[
    MotoristasCrudComponent,
    MotoristasInsertComponent,],
  imports:[
    MotoristasRoutingModule,
    SharedModule,
  ]
})
export class MotoristasModule{}