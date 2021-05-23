import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MeetDialogComponent} from './meet-dialog.component'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule,  } from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import { HttpService} from '../service/http-service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [CommonModule,
     MatButtonModule,
     MatInputModule, 
     FormsModule, 
     MatDatepickerModule, 
     ReactiveFormsModule, 
     MatNativeDateModule, 
     MatProgressSpinnerModule, 
     MatSnackBarModule, 
     MatChipsModule,
     MatIconModule
    ],
  declarations: [MeetDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    HttpService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ]
})

export class MeetDialogModule { }
