import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../login.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-new-domain',
  templateUrl: './new-domain.component.html',
  styleUrls: ['./new-domain.component.css']
})
export class NewDomainComponent implements OnInit {
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
    console.log('new domain component init');
    this.reading = this.login;
    setTimeout(() => {
      this.torch = false;
    }, 1);
    const interval = setInterval(() => {
      this.torch = true;
    }, 2000);
    clearInterval(interval);
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
      setTimeout(() => {
        this.torch = false;
      }, 1);
      setInterval(() => {
        this.torch = true;
      }, 2000);
    }, 5000);
  }

  flash() {
    this.torch = true;
  }
}
