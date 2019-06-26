import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tab = 3;
  loginSubject: Subject<void> = new Subject<void>();
  isLogin = true;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.onTabChange(1);
    this.loginService.isLogin().subscribe(x => {
      this.isLogin = x;
      if (x) {
        this.login(1);
        this.tab = 0;
      } else {
        this.tab = 1;
      }
    }, () => {
      this.isLogin = false;
      this.tab = 1;
    });
  }

  onTabChange (e) {
    this.tab = e.index;
    if (e.index === 3) {
      this.loginService.logout().subscribe(x => {
        this.isLogin = false;
        console.log('logged out');
        this.loginSubject.next();
      });
    } else if (e.index === 1) {
      this.loginService.getHistory();
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
