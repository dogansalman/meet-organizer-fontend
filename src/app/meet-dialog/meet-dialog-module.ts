import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MeetDialogComponent} from './meet-dialog.component'
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [MeetDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MeetDialogModule { }