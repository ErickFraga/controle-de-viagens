import { materializeModule } from './../../shared/materialize.module';
import { SharedModule } from './../../shared/shared.module';
import { CaminhoesInsertComponent } from './caminhoes-insert/caminhoes-insert.component';
import { CaminhoesCrudComponent } from './caminhoes-crud/caminhoes-crud.component';
import { CaminhoesRoutingModule } from './caminhoes-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations:[
    CaminhoesCrudComponent,
    CaminhoesInsertComponent,],
  imports:[
    CaminhoesRoutingModule,
    SharedModule,
  ]
})
export class CaminhoesModule{}