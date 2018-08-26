import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogContentExampleDialogComponent } from './domain-diaglog.component';
import { LoginService } from '../login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {

  @Input() loginEvent: Observable<void>;

  constructor(public dialog: MatDialog, public loginService: LoginService) { }

  domains = [];
  ngOnInit() {
    this.loginEvent.subscribe(() => this.getDomains());
    this.getDomains();
  }

  getDomains() {
    this.loginService.domains().subscribe((res) => {
      this.domains = res;
    });
  }

  onDomainClick(domain) {
    if (!window.getSelection().toString()) {
      setTimeout(() => {
        const dialogRef = this.dialog.open(DialogContentExampleDialogComponent,
        { data: { domain },
          position: { top: '50px' },
          width: '600px'
        });
        dialogRef.afterClosed().subscribe(res => {
          console.log(res);
          if (res) {
            this.getDomains();
          }
        });
      });
    }
  }
}
