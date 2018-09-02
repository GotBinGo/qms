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
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    /*
    this.loginService.isLogin().subscribe(res => {
      this.setTab.emit(0);
      this.login.emit();
    });
    // gotta go fast
    */
  }

  onLogin() {
    this.loginService.login(this.username, this.password).subscribe((res) => {
      if (res === 'good') {
        this.setTab.emit(0);
        this.login.emit();
      } else {
      }
    });
  }

  onRegister() {
  }
}
