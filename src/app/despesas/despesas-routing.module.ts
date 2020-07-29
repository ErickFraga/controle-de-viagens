import { DespesasCrudComponent } from './despesas-crud/despesas-crud.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


const routes: Routes = [
  {
    path: "",
    component: DespesasCrudComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespesasRoutingModule {}