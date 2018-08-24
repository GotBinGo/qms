import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-dialog-content-example-dialog',
    templateUrl: './domain-diaglog.component.html',
    styleUrls: ['./domain-diaglog.component.css']
  })
export class DialogContentExampleDialogComponent {
data = null;
    constructor(@Inject(MAT_DIALOG_DATA) public d: any) {
        this.data = d;
    }

    onSelectCurrentIP() {
    }

    onSave() {
    }
}
