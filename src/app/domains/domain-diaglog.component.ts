import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LoginService } from '../login.service';

@Component({
    selector: 'app-dialog-content-example-dialog',
    templateUrl: './domain-diaglog.component.html',
    styleUrls: ['./domain-diaglog.component.css']
  })
export class DialogContentExampleDialogComponent implements OnInit {
    data = null;
    ip = '';
    error = '';
    constructor(public dialogRef: MatDialogRef<DialogContentExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public d: any, private loginService: LoginService) {
        this.data = d;
    }

    ngOnInit() {
        this.ip = this.data.domain.ip;
    }

    onSelectCurrentIP() {
        this.loginService.currentIP().subscribe((res) => {
            this.ip = res;
        });
    }

    onSave() {
        this.loginService.update(this.data.domain.name + '.' + this.data.domain.domain, this.ip).subscribe((res) => {
            this.error = res;
            if (res === 'good') {
                this.dialogRef.close(1);
            }
        });
    }
}
