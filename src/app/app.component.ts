import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tab = 0;

  onTabChange (e) {
  }

  setTab(p) {
    this.tab = p;
  }
}
