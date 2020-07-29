import { materializeModule } from './../../shared/materialize.module';
import { SharedModule } from './../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { NgModule } from '@angular/core';
@NgModule({
  declarations:[HomeComponent],
  imports:[
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule{}