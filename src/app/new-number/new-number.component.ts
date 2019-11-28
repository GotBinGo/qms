import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ServicesService } from '../services.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-number',
  templateUrl: './new-number.component.html',
  styleUrls: ['./new-number.component.css']
})
export class NewNumberComponent implements OnInit, OnDestroy {
  constructor(private servicesService: ServicesService, private matSnackBar: MatSnackBar, private route: Router, private ar: ActivatedRoute) { }
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
  done = false;

  lastSelectedCase;

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
      if (this.login && (this.number || this.number === undefined) && (!this.number || this.number && this.number.status !== 'done')) {
        this.servicesService.getLatestNumber(this.number ? this.number._id : null).subscribe(x => {
          this.number = x;
          if (x && x.status === 'done' && this.number) {
            this.done = true;
          }
        });
        if (this.orgs.length === 0) {
          this.servicesService.getOrgs().subscribe(a => {
            this.orgs = a;
            setTimeout(x => {
              if (this.route.url === '/') {
              } else {
                this.onOrgSelect(this.route.url.split('/')[this.route.url.split('/').length - 1]);
              }
            }, 1);
          });
        }
      }
    }, 1000);


  }


  ngOnDestroy() {
    this.route.navigate(['/']);
    clearInterval(this.timer);
  }

  onChange(e) {
    e.preventDefault();
  }

  onOrgSelect(n) {
    if (!this.orgs[n]) {
      this.matSnackBar.open('Invalid URL.', '', { duration: 2000 });
      return;
    }
    this.org = n;
    this.route.navigate(['/', this.orgs[this.org].org]);
    this.servicesService.getCases(this.orgs[this.org].org).subscribe(x => {
      this.cases = x;
    });
  }

  onNewNumber(n) {
    this.lastSelectedCase = n;
    this.servicesService.getNewNumber(n, this.org).subscribe(x => {
      if (x && !x.errors) {
        this.number = x;
      } else {
        this.number = null;
      }
    });
  }

  onCodeResult(x) {
    this.reading = false;
    x = x.split('/')[x.split('/').length - 1];
    this.onOrgSelect(x);
    this.matSnackBar.open(x, '', { duration: 2000 });
  }

  flash() {
    this.torch = !this.torch;
  }

  cancelNumber() {
    this.servicesService.cancelNumber(this.number._id).subscribe(x => {
      this.number = null;
      this.done = false;
      // this.servicesService.getLatestNumber(null).subscribe(y => {
      //   // this.number = y;
      //   this.number = null;
      // });
    });
  }

  delayNumber() {
    this.servicesService.delayNumber(this.number._id).subscribe(x => {

    });
  }

  guest() {
    this.servicesService.guest().subscribe((res) => {
      if (!res.errors) {
        localStorage.token = res.token;
        this.oLogin.emit();
      }
    });
  }

  logIn() {
    this.setTab.emit(2);
  }

  back() {
    this.org = null;
    this.cases = [];
    this.route.navigate(['/']);
  }

  thumbs() {
    this.done = false;
    this.number = undefined;
  }
}
