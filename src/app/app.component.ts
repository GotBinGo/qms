import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ServicesService } from './services.service';
import { MatDialog } from '@angular/material';
import { ServeComponent } from './serve/serve.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tab = 0;
  loginSubject: Subject<void> = new Subject<void>();
  isLogin = false;
  role = '-';

  constructor(private servicesService: ServicesService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.onTabChange(1);
    this.servicesService.isLogin().subscribe(x => {
      this.isLogin = x;
      if (x) {
        this.login(1);
        this.tab = 0;
      } else {
        this.tab = 0;
      }
    }, () => {
      this.isLogin = false;
      this.role = '-';
      this.tab = 0;
    });
  }

  onTabChange (e) {
    this.tab = e.index;
    if (e.index === 1 && this.isLogin) {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '80%',
        maxWidth: '500px',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.servicesService.logout().subscribe(x => {
            this.isLogin = false;
            this.role = '-';
            console.log('logged out');
            this.loginSubject.next();
          });
        } else {
          this.tab = 0;
          // nav back
        }
      });
    } else if (e.index === 1 && this.isLogin) {
    }
  }

  setTab(p) {
    this.tab = p;
  }

  login(e) {
    this.loginSubject.next();
    this.isLogin = true;
    this.servicesService.getUsers().subscribe(a => {
      const uid = JSON.parse(atob(localStorage.token.split('.')[1])).sub;
      this.role = a.filter(x => uid === x._id)[0].role;
    });
  }
}
