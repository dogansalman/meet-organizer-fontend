import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {HttpService} from './service/http-service'
// Toplanti ekle/düzenle dialog bileşeni uygulama modülü içine yüklenir.
import {MeetDialogModule} from '../app/meet-dialog/meet-dialog-module'



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MeetDialogModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule { }

