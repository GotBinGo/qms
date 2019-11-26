import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginService } from './login.service';
import { MatDialog } from '@angular/material';
import { InstructionsComponent } from './instructions/instructions.component';
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

  constructor(private loginService: LoginService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.onTabChange(1);
    this.loginService.isLogin().subscribe(x => {
      this.isLogin = x;
      if (x) {
        this.login(1);
        this.tab = 0;
      } else {
        this.tab = 0;
      }
    }, () => {
      this.isLogin = false;
      this.tab = 0;
    });
  }

  onTabChange (e) {
    this.tab = e.index;
    if (e.index === 3) {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '80%',
        maxWidth: '500px',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loginService.logout().subscribe(x => {
            this.isLogin = false;
            console.log('logged out');
            this.loginSubject.next();
          });
        } else {
          this.tab = 0;
          // nav back
        }
      });
    } else if (e.index === 1 && this.isLogin) {
      // this.loginService.getHistory();
    }
  }

  setTab(p) {
    this.tab = p;
  }

  login(e) {
    this.loginSubject.next();
    this.isLogin = true;
  }
}
