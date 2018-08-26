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

  domains() {
    return this.http.get<any>('../api/domains.php');
  }

  update(hostname, ip) {
    return this.http.get('../api/upd_sess.php?hostname=' + hostname + '&myip=' + ip, {responseType: 'text'});
  }

  currentIP() {
    return this.http.get('../api/ip.php', {responseType: 'text'});
  }
}
