import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tab = 3;
  loginSubject: Subject<void> = new Subject<void>();
  isLogin = false;

  constructor(private loginService: LoginService) {
  }

  onTabChange (e) {
    this.tab = e.index;
    if (e.index === 3) {
      this.loginService.logout().subscribe(x => {
        this.isLogin = false;
        this.loginSubject.next();
      });
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
