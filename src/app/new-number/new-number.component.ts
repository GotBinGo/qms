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

  objectKeys = Object.keys;
  cases = ['Útlevél', 'Csekk Befizetés', 'Dokumentum Átvétel'];

  number;

  @Input()
  login = null;

  ngOnInit() {
    this.reading = true; // this.login;
    setTimeout(() => {
      this.torch = false;
    }, 1);
    setInterval(() => {
      this.torch = true;
    }, 2000);

    this.loginService.getLatestNumber().subscribe(x => {
      this.number = x;
    });

    this.onCodeResult('123-112-132'); // TODO mock
  }

  onChange(e) {
    e.preventDefault();
  }

  onUnlock(n) {
    this.loginService.getNewNumber(n).subscribe(x => {
      if (x && !x.errors) {
        this.number = x;
      }
    });
    // get number with n (case index)

    // this.loginService.getBike(this.endingControl.value).subscribe(x => {
    //   console.log(x);
    // });
  }

  onCodeResult(x) {
    this.reading = false;
    this.qrResult = x;
    this.matSnackBar.open(x, '', { duration: 2000 });
    // setTimeout(() => {
    //   this.qrResult = '';
    //   this.reading = true;
    // }, 5000);
  }

  flash() {
    this.torch = !this.torch;
  }

  cancelNumber() {
    this.loginService.cancelNumber(this.number._id).subscribe(x => {
      this.loginService.getLatestNumber().subscribe(y => {
        this.number = y;
      });
    });
  }
}
