import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicesService } from '../services.service';
import { CasePickerModalComponent } from '../case-picker-modal/case-picker-modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-serve',
  templateUrl: './serve.component.html',
  styleUrls: ['./serve.component.css']
})
export class ServeComponent implements OnInit, OnDestroy {

  constructor(private servicesService: ServicesService, public dialog: MatDialog) { }
  objectKeys = Object.keys;
  users;
  user;

  timer;
  cases = [];
  whereToGo = 'counter';

  number = null;

  status = 'start';

  ngOnInit() {
    this.servicesService.getUsers().subscribe(a => {
      this.users = a;
      const uid = JSON.parse(atob(localStorage.token.split('.')[1])).sub;
      this.user = a.filter(x => uid === x._id)[0];
      this.servicesService.getCases(this.user.org).subscribe(x => {
        this.cases = x;
      });
    });

    this.timer = setInterval(_ => {
      // serve
      if (this.status === 'serving' && !this.number) {
        this.servicesService.getNextNumber(this.user.org,
          this.cases.filter(x => x.selected).map(x => x.case),
          this.whereToGo).subscribe(x => {
            if (x) {
              this.number = x;
            }
        });
      }
    }, 1000);
  }

  start() {
    const dialogRef = this.dialog.open(CasePickerModalComponent, {
      width: '80%',
      maxWidth: '500px',
      data: {cases: this.cases, whereToGo: this.whereToGo}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cases = result.cases;
        this.whereToGo = result.whereToGo;
        this.status = 'serving';
      }
    });

  }

  pause() {
    this.status = 'pause';
    this.number = null;
  }

  next() {
    this.servicesService.cancelNumber(this.number._id).subscribe(x => {
      this.number = null;
    });
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  get diff() {
    return Math.trunc((+new Date() - +new Date(this.number.createdAt)) / 1000 / 60);
  }

}
