import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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

  constructor(public dialogRef: MatDialogRef<MeetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      console.log(data)
    }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
