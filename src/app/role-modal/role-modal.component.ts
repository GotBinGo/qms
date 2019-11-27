import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginService } from '../login.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.css']
})
export class RoleModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, private loginService: LoginService) { }
  objectKeys = Object.keys;

  title;
  text;
  user;
  orgs;
  value = '';
  orgValue;
  org;

  @ViewChild('org', { static: false}) model: NgModel;

  ngOnInit() {
    this.title = this.data.title;
    this.text = this.data.text;
    this.value = this.data.role;
    this.user = this.data.user;
    this.orgs = this.data.orgs;
    this.orgValue = this.user.org;
  }

  ok() {
    if (this.model.invalid) {
      return true;
    }

    this.loginService.setUser(this.user._id, this.value, this.orgValue).subscribe(x => {
      this.dialogRef.close(true);
    });
  }

  cancel() {
    this.dialogRef.close(false);

  }
}
