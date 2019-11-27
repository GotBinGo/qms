import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-case-picker-modal',
  templateUrl: './case-picker-modal.component.html',
  styleUrls: ['./case-picker-modal.component.css']
})
export class CasePickerModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  objectKeys = Object.keys;

  cases;

  ngOnInit() {
    this.cases = this.data.cases;
    this.cases = this.cases.map(x => {
      x.selected = true;
      return x;
    });
  }

  ok() {
    this.dialogRef.close(this.cases);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
