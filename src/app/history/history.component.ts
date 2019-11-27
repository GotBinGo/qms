import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { _ } from 'underscore';
import { TextInputModalComponent } from '../text-input-modal/text-input-modal.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { RoleModalComponent } from '../role-modal/role-modal.component';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private loginService: LoginService, public dialog: MatDialog, private matSnackBar: MatSnackBar) { }

  orgs = [];
  cases = [];
  users = [];
  objectKeys = Object.keys;

  selectedOrgIndex = null;

  ngOnInit() {
    this.loginService.getOrgs().subscribe(a => {
      this.orgs = a;
    });
    this.loginService.getUsers().subscribe(a => {
      this.users = a;
    });
  }

  add() {
    const dialogRef = this.dialog.open(TextInputModalComponent, {
      width: '80%',
      maxWidth: '500px',
      data: {title: 'New organization', text: 'What should be the name of the new organization?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loginService.addOrg(result).subscribe(x => {
          if (x.err) {
            this.matSnackBar.open('Duplicate organization name.', '', { duration: 2000 });
          } else {
            this.loginService.getOrgs().subscribe(a => {
              this.orgs = a;
            });
          }
        });
      } else if (result === null || result === undefined) {

      } else {
        this.matSnackBar.open('Invalid organization name.', '', { duration: 2000 });
      }
    });
  }

  addCase() {
    const dialogRef = this.dialog.open(TextInputModalComponent, {
      width: '80%',
      maxWidth: '500px',
      data: {title: 'New case', text: 'What should be the name of the new case?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loginService.addCase(this.orgs[this.selectedOrgIndex].org, result, 3).subscribe(x => {
          if (x.err) {
            this.matSnackBar.open('Duplicate organization name.', '', { duration: 2000 });
          } else {
            this.loginService.getCases(this.orgs[this.selectedOrgIndex].org).subscribe(a => {
              this.cases = a;
            });
          }
        });
      } else if (result === null || result === undefined) {

      } else {
        this.matSnackBar.open('Invalid organization name.', '', { duration: 2000 });
      }
    });
  }

  onOrgSelect(i) {
    this.selectedOrgIndex = i;
    this.loginService.getCases(this.orgs[i].org).subscribe(x => {
      this.cases = x;
    });
  }

  back() {
    this.selectedOrgIndex = null;
    this.cases = [];
  }

  onUserSelect(i) {
    const dialogRef = this.dialog.open(RoleModalComponent, {
      width: '80%',
      maxWidth: '500px',
      data: {title: 'Edit user role', text: 'What should be the role of '+ this.users[i].name +'?', user: this.users[i], role: this.users[i].role, orgs: this.orgs}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loginService.getUsers().subscribe(a => {
          this.users = a;
        });
      } else {
      }
    });
  }

}
