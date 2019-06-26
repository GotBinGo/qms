import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username, password) {
    return this.http.get<any>('../api/login.php?username=' + username + '&password=' + password);
  }

  isLogin() {
    return this.http.get<any>('../api/islogin.php');
  }

  logout() {
    return this.http.get<any>('../api/logout.php');
  }

  getBike(code) {
    return this.http.get<any>('../api/getBike.php?code=' + code);
  }

  getHistory() {
    return this.http.get<any>('../api/history');
  }

}
