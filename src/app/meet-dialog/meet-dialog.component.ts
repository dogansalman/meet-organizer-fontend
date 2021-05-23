import { Component, OnInit, Inject} from '@angular/core';
import { DatePipe } from '@angular/common';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { HttpService} from '../service/http-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MeetElement} from '../interface/meet';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Attendance } from '../interface/attendance';

@Component({
  selector: 'app-meet-dialog',
  templateUrl: '../meet-dialog/meet-dialog.component.html',
  styleUrls: ['./meet-dialog.component.scss']
})

export class MeetDialogComponent implements OnInit {

  public meetForm: any;
  public showSpinner: Boolean = false
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  
  attendances: Attendance[] = [];


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
        end_time: new FormControl('', Validators.required),
      })     
      

      if(!data) return;
      /*  Eğer bileşene Inject edilmiş bir data varsa toplantı kaydı düzenlenmek istendiği anlaşılır 
          ve forma değerler ayarlanır.
       */
      // Detay bilgilere erişiyoruz.
      this.api.get(`meets/api/${data.id}`, {}).subscribe(_meet => {
      
        this.meetForm.patchValue({
          subject: _meet.subject, 
          date: _meet.date, 
          start_time: _meet.start_time,
          end_time: _meet.end_time,
        });
        this.attendances = _meet.Attendances;


      })

    
      

  }


  toggleSpinner(): void {
    this.showSpinner = !this.showSpinner;
  }

  showToast(message: string) {
    this._snackBar.open(message);
  }
  
  onDeleteClick(): void {
    
    // Eğer inject edilmiş data varsa ilgili kayıt silinebilir.
    if(!this.data  || !this.data.id) return;
    
    this.api.delete(`meets/api/${this.data.id}/delete`).subscribe(
      res => {
        this.toggleSpinner();
        this.showToast("Toplantı kaydı silindi.")
      },
      err => {
        this.toggleSpinner();
        // Bad request dönen fieldların hata mesajlarını toast message içinde göster
        let err_msg = ""
        Object.keys(err.error).forEach(f => err_msg += err.error[f])
        this.showToast(err_msg);
      },
      () => this.dialogRef.close()
    );
  }

  onDoneClick(): void {
    if (!this.meetForm.valid) { return; }
    this.toggleSpinner();
    
    // Tarih angular pipe transform ile formatlanır.
    const pipe = new DatePipe('en-GB');
    this.meetForm.value.date = pipe.transform(this.meetForm.value.date, 'YYYY-MM-dd');

    if(this.data && this.data.id) {
      // Toplantı kaydını güncelle.
      Object.assign(this.meetForm.value, {'Attendances': this.attendances});

      this.api.put(`meets/api/${this.data.id}`, this.meetForm.value).subscribe(
        res => {
          this.toggleSpinner();
          this.showToast("Toplantı kaydı güncellendi.")
        },
        err => {
          this.toggleSpinner();
          // Bad request dönen fieldların hata mesajlarını toast message içinde göster
          let err_msg = ""
          Object.keys(err.error).forEach(f => err_msg += err.error[f])
          this.showToast(err_msg);
        },
        () => this.dialogRef.close()
      );
    } else {
      // Yeni toplantı kaydı oluştur.
      
      Object.assign(this.meetForm.value, {'Attendances': this.attendances})
      this.api.post("meets/api/create", this.meetForm.value).subscribe(
        res => {
          this.toggleSpinner();
          this.showToast("Toplantı kaydı oluşturuldu.")
        },
        err => {
          this.toggleSpinner();
          
          // api servisine erişilemiyorsa.
          if(!err.status) {
            this.showToast('Bağlantı hatası.');
            return;
          }

          // Bad request dönen fieldların hata mesajlarını toast message içinde göster
          let err_msg = ""
          Object.keys(err.error).forEach(f => err_msg += err.error[f])
          this.showToast(err_msg);
        },
        () => this.dialogRef.close()
      );
    }
 
    
    
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add attendance
    if (value) {
      this.attendances.push({fullname: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(att: Attendance): void {
    console.log(att, "attt")
    this.api.delete(`meets/api/attendance/${att.attendance_id}/delete`)
    .subscribe(
      res => {
        this.showToast("Katılımcı silindi.")
      },
      err => {
        // api servisine erişilemiyorsa.
        if(!err.status) {
          this.showToast('Bağlantı hatası.');
          return;
        }
      },
    )
    const index = this.attendances.indexOf(att);

    if (index >= 0) {
      this.attendances.splice(index, 1);
    }
  }
  

  ngOnInit(): void {}
}
