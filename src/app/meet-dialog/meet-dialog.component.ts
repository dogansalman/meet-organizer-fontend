import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { HttpService} from '../service/http-service';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-meet-dialog',
  templateUrl: '../meet-dialog/meet-dialog.component.html',
  styleUrls: ['./meet-dialog.component.scss']
})

export class MeetDialogComponent implements OnInit {

  public meetForm: any;

  constructor( public dialogRef: MatDialogRef<MeetDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    private api: HttpService
    ) { 
      // Form group 
      this.meetForm = new FormGroup({
        subject: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
        date: new FormControl('', [Validators.required]),
        start_time: new FormControl('', [Validators.required]),
        end_time: new FormControl('', Validators.required)
      })      
    }
  
  onDoneClick(): void {
    if (!this.meetForm.valid) { return; }
    this.api.post("meets/api/create", this.meetForm.value).subscribe(() => {
      alert("OK")
    })
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  

  ngOnInit(): void {}
}
