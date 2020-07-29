import { materializeModule } from './../../shared/materialize.module';
import { SharedModule } from './../../shared/shared.module';
import { ViagensInsertComponent } from './viagens-insert/viagens-insert.component';
import { ViagensCrudComponent } from './viagens-crud/viagens-crud.component';
import { ViagensRoutingModule } from './viagens-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations:[
    ViagensCrudComponent,
    ViagensInsertComponent,],
  imports:[
    ViagensRoutingModule,
    SharedModule,
  ]
})
export class ViagensModule{}