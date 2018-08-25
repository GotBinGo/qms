import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogContentExampleDialogComponent } from './domain-diaglog.component';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  onDomainClick(domain) {
    setTimeout(() => {
      const dialogRef = this.dialog.open(DialogContentExampleDialogComponent,
      { data: { domain },
        position: { top: '50px' },
        width: '600px'
      });
    });
  }
}
