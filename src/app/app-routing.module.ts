import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./views/home/home.component";
import { DespesasCrudComponent } from "./views/despesas-crud/despesas-crud.component";
const routes: Routes = [
  {
    path: "despesas",
    component: DespesasCrudComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "**",
    redirectTo: "home",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
