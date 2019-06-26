import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
    this.onHistoryChange = new BehaviorSubject([]);
  }

  onHistoryChange: BehaviorSubject<any>;

  login(email, password) {
    return this.http.post<any>('../api/auth/login', {email, password});
  }

  isLogin() {
    return this.http.get<any>('../api/auth/isLogin');
  }

  logout() {
    localStorage.token = '';
    return of(true);
  }

  getBike(code) {
    return this.http.get<any>('../api/getBike.php?code=' + code);
  }

  getHistory() {
    return this.http.get<any>('../api/auth/history').subscribe(x => this.onHistoryChange.next(x));
  }

}
