import { materializeModule } from './materialize.module';
import { ShowComponent } from './components/show/show.component';
import { IndexComponent } from './components/index/index.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations:[
    IndexComponent,
    ShowComponent
  ],
  imports: [
    FormsModule,
    materializeModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    materializeModule,
    IndexComponent,
    ShowComponent,
    CommonModule
  ],
})

export class SharedModule { }
