import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../login.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-new-number',
  templateUrl: './new-number.component.html',
  styleUrls: ['./new-number.component.css']
})
export class NewNumberComponent implements OnInit {
  constructor(private loginService: LoginService, private matSnackBar: MatSnackBar) { }
  dot = '.';
  endingControl = new FormControl('');
  name = '';
  reading = false;
  qrResult = '';
  torch = false;

  @Input()
  login = null;

  ngOnInit() {
    this.reading = this.login;
    setTimeout(() => {
      this.torch = false;
    }, 1);
    setInterval(() => {
      this.torch = true;
    }, 2000);
  }

  onChange(e) {
    e.preventDefault();
  }

  onUnlock() {
    this.loginService.getBike(this.endingControl.value).subscribe(x => {
      console.log(x);
    });
  }

  onCodeResult(x) {
    this.reading = false;
    this.qrResult = x;
    this.matSnackBar.open(x, '', { duration: 2000 });
    setTimeout(() => {
      this.qrResult = '';
      this.reading = true;
    }, 5000);
  }

  flash() {
    this.torch = !this.torch;
  }
}
