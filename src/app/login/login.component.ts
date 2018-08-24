import { Component, OnInit, setTestabilityGetter, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  register = false;
  @Output() setTab = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onLogin() {
    this.setTab.emit(0);
  }

  onRegister() {
  }
}
