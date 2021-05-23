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

  getMeets() {
    // get meets
    this.api.get('meets/api', {}).subscribe(_meet => {
      this.meets = _meet;
    })
  }

  // onload get meets from api
  ngOnInit() {
    this.getMeets();
  }

  // Open meet dialog
  openDialog(data = null): void {
    const dialogRef = this.dialog.open(MeetDialogComponent, {
      width: '700px',
      height:'500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(meet => {
      /* Todo
        Modal kapatıldığında yeniden bir istek yapmak yerine afterClosed içinde gönderilen meet bilgisini kullanarak 
        meets dizisini güncellenebilir. 
        modal kapatıldığında datasource olarak kullanılan dizide birşey değişmediği için render yeniden tetiklenmesede api den anlamsız bir request yapıyor.

      */
      this.getMeets();    
    });
  }
}
