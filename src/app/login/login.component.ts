import { Component, OnInit, setTestabilityGetter, Output, EventEmitter } from '@angular/core';
import { ServicesService } from '../services.service';

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

  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
  }

  onLogin() {
    this.servicesService.login(this.username, this.password).subscribe((res) => {
      if (!res.errors) {
        localStorage.token = res.token;
        this.setTab.emit(0);
        this.login.emit();
      }
    });
  }

  onRegister() {
    this.servicesService.register(this.regUsername, this.regPassword, this.regNick).subscribe((res) => {
      this.username = this.regUsername;
      this.password = this.regPassword;
      this.onLogin();
    });
  }
}
