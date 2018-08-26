import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tab = 3;
  loginSubject: Subject<void> = new Subject<void>();

  onTabChange (e) {
    this.tab = e.index;
  }

  setTab(p) {
    this.tab = p;
  }

  login(e) {
    this.loginSubject.next();
  }
}
