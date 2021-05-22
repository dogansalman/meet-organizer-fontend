import { Component, OnInit } from '@angular/core';
import {MeetDialogComponent} from './meet-dialog/meet-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {HttpService} from './service/http-service';
import {MeetElement} from './interface/meet'




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Meets';
  public meets: MeetElement[] = [];
  displayedColumns: string[] = ['id', 'subject', 'date', 'start_time', 'end_time'];

  
  constructor(public dialog: MatDialog, private api: HttpService) { }


  // onload get meets from api
  ngOnInit() {
    // get meets
    this.api.get('meets/api', {}).subscribe(_meet => {
     this.meets = _meet;
    })
  }

  // Open meet dialog
  openDialog(data = null): void {
    console.log(data)
    const dialogRef = this.dialog.open(MeetDialogComponent, {
      width: '700px',
      height:'500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(meet => {
      console.log('The dialog was closed', meet);      
    });
  }
}
