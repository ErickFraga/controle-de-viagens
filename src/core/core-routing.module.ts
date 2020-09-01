import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";



const routes: Routes = [
  {
    path: "despesas",
    loadChildren: () => import('../app/despesas/despesas.module').then(x => x.DespesasModule),
  },
  {
    path: "motoristas",
    loadChildren: () => import('../app/motoristas/motoristas.module').then(x => x.MotoristasModule),
  },
  {
    path: "caminhoes",
    loadChildren: () => import('../app/caminhoes/caminhoes.module').then(x => x.CaminhoesModule),
  },
  {
    path: "viagens",
    loadChildren:() => import('../app/viagens/viagens.module').then(x => x.ViagensModule),
  },
  {
    path: "home",
    loadChildren: () => import('../app/home/home.module').then(x => x.HomeModule),
  },
  {
    path: "**",
    redirectTo: "home",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
 