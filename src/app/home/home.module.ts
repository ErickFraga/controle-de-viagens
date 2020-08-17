import { materializeModule } from './../../shared/materialize.module';
import { SharedModule } from './../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { ChartsModule } from "ng2-charts";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    HomeRoutingModule,
    SharedModule,
    ChartsModule
  ]
})
export class HomeModule { }