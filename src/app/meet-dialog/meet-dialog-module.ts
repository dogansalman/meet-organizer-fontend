import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MeetDialogComponent} from './meet-dialog.component'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule,  } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { HttpService} from '../service/http-service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatInputModule, FormsModule, MatDatepickerModule, ReactiveFormsModule, MatNativeDateModule, MatProgressSpinnerModule, MatSnackBarModule],
  declarations: [MeetDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[HttpService]
})

export class MeetDialogModule { }
