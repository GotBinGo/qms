import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { LoginService } from '../login.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-new-number',
  templateUrl: './new-number.component.html',
  styleUrls: ['./new-number.component.css']
})
export class NewNumberComponent implements OnInit, OnDestroy {
  constructor(private loginService: LoginService, private matSnackBar: MatSnackBar) { }
  dot = '.';
  endingControl = new FormControl('');
  name = '';
  reading = false;
  qrResult = '';
  torch = false;

  objectKeys = Object.keys;
  cases = ['Útlevél', 'Csekk Befizetés', 'Dokumentum Átvétel'];
  orgs = [];

  org;
  number;

  @Input() login = null;
  @Output() oLogin = new EventEmitter<void>();
  @Output() setTab = new EventEmitter<number>();

  timer;

  ngOnInit() {
    this.reading = true; // this.login;
    setTimeout(() => {
      this.torch = false;
    }, 1);
    setInterval(() => {
      this.torch = true;
    }, 2000);

    this.reading = false;

    this.timer = setInterval(_ => {
      if (this.login) {
        this.loginService.getLatestNumber().subscribe(x => {
          this.number = x;
        });
        this.loginService.getOrgs().subscribe(a => {
          this.orgs = a;
        });
      }
    }, 1000);


    // this.onCodeResult('123-112-132'); // TODO mock
  }


  ngOnDestroy() {
    clearInterval(this.timer);
  }

  onChange(e) {
    e.preventDefault();
  }

  onOrgSelect(n) {
    this.org = n;
    this.loginService.getCases(this.orgs[this.org].org).subscribe(x => {
      this.cases = x;
    });
  }

  onNewNumber(n) {
    this.loginService.getNewNumber(n, this.org).subscribe(x => {
      if (x && !x.errors) {
        this.number = x;
      } else {
        this.number = null;
      }
    });
    // get number with n (case index)

    // this.loginService.getBike(this.endingControl.value).subscribe(x => {
    //   console.log(x);
    // });
  }

  onCodeResult(x) {
    this.reading = false;
    x = x.split('/')[x.split('/').length - 1];
    this.org = x;
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

  guest() {
    console.log('');
    this.loginService.guest().subscribe((res) => {
      console.log(res);
      if (!res.errors) {
        localStorage.token = res.token;
        this.oLogin.emit();
      }
    });
  }

  logIn() {
    this.setTab.emit(2);
  }
}
