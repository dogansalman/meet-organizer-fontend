import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { HttpService} from '../service/http-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MeetElement} from '../interface/meet';


@Component({
  selector: 'app-meet-dialog',
  templateUrl: '../meet-dialog/meet-dialog.component.html',
  styleUrls: ['./meet-dialog.component.scss']
})

export class MeetDialogComponent implements OnInit {

  public meetForm: any;
  public showSpinner: Boolean = false

  // Modal bileşeni Inject ile bir üst bileşenden meet interface'ini data olarak alıyor.
  constructor( public dialogRef: MatDialogRef<MeetDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: MeetElement,
    private api: HttpService,
    private _snackBar: MatSnackBar
    ) { 


      // Modal içindeki formGroup ve validatation tanımı
      this.meetForm = new FormGroup({
        subject: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
        date: new FormControl('', [Validators.required]),
        start_time: new FormControl('', [Validators.required]),
        end_time: new FormControl('', Validators.required)
      })     
      

      if(!data) return;
      /*  Eğer bileşene Inject edilmiş bir data varsa toplantı kaydı düzenlenmek istendiği anlaşılır 
          ve forma değerler ayarlanır.
       */
      this.meetForm.patchValue({
        subject: data.subject, 
        date: data.date, 
        start_time: data.start_time,
        end_time: data.end_time
      });
      

    }

  toggleSpinner(): void {
    this.showSpinner = !this.showSpinner;
  }

  showToast(message: string) {
    this._snackBar.open(message);
  }
  
  onDoneClick(): void {
    if (!this.meetForm.valid) { return; }
    this.toggleSpinner();
    this.api.post("meets/api/create", this.meetForm.value).subscribe(() => {
      this.toggleSpinner();
      this.showToast("Toplantı kaydı oluşturuldu.")
    })

    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  

  ngOnInit(): void {}
}
