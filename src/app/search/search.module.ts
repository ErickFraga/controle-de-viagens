import { SharedModule } from './../../shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    SearchRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }