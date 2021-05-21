import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Toplanti ekle/düzenle dialog bileşeni uygulama modülü içine yüklenir.
//import {MeetDialogComponent} from './meet-dialog/meet-dialog.component'
import {MeetDialogModule} from '../app/meet-dialog/meet-dialog-module'


@NgModule({
  declarations: [
    AppComponent,
    //MeetDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MeetDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

