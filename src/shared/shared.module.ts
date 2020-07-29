import { materializeModule } from './materialize.module';
import { ShowComponent } from './components/show/show.component';
import { IndexComponent } from './components/index/index.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations:[
    IndexComponent,
    ShowComponent
  ],
  imports: [
    FormsModule,
    materializeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    materializeModule,
    CommonModule,
    IndexComponent,
    ShowComponent
  ],
})

export class SharedModule { }
