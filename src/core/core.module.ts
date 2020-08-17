import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { CoreComponent } from './core.component';
import { CoreRoutingModule } from './core-routing.module';
import { NgModule } from '@angular/core';
import { environment } from "../environments/environment";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CoreComponent
    ],

  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    CoreRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [CoreComponent],
})
export class CoreModule {}
