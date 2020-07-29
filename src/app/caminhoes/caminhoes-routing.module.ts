import { CaminhoesCrudComponent } from './caminhoes-crud/caminhoes-crud.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


const routes: Routes = [
  {
    path: "",
    component: CaminhoesCrudComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaminhoesRoutingModule {}