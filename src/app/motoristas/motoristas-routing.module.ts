import { MotoristasCrudComponent } from './motoristas-crud/motoristas-crud.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


const routes: Routes = [
  {
    path: "",
    component: MotoristasCrudComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotoristasRoutingModule {}