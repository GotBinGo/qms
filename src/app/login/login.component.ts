import { Component, OnInit, setTestabilityGetter, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  register = false;
  @Output() setTab = new EventEmitter<number>();
  @Output() login = new EventEmitter<void>();

  username = '';
  password = '';

  regUsername = '';
  regPassword = '';
  regNick = '';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  onLogin() {
    this.loginService.login(this.username, this.password).subscribe((res) => {
      if (!res.errors) {
        localStorage.token = res.token;
        this.setTab.emit(0);
        this.login.emit();
      }
    });
  }

  onRegister() {
    this.loginService.register(this.regUsername, this.regPassword, this.regNick).subscribe((res) => {
      this.username = this.regUsername;
      this.password = this.regPassword;
      this.onLogin();
    });
  }
}
