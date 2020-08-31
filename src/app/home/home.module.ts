import { SharedModule } from './../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations:[HomeComponent],
  imports:[
    HomeRoutingModule,
    SharedModule,
    ChartsModule
  ]
})
export class HomeModule{}