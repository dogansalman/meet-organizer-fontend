import { Component } from '@angular/core';
import {MeetDialogComponent} from './meet-dialog/meet-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  title = 'meets';

  constructor(public dialog: MatDialog) { }

  // Open meet dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(MeetDialogComponent, {
      width: '700px',
      height:'500px',
      data: {name: "name", animal: "animal"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);      
    });
  }

}
