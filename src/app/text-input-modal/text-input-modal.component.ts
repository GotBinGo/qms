import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-text-input-modal',
  templateUrl: './text-input-modal.component.html',
  styleUrls: ['./text-input-modal.component.css']
})
export class TextInputModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  title;
  text;

  value = '';

  ngOnInit() {
    this.title = this.data.title;
    this.text = this.data.text;
  }

  ok() {
    this.dialogRef.close(this.value);
  }

  cancel() {
    this.dialogRef.close(null);
  }

}
