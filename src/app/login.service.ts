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

  guest() {
    return this.http.post<any>('../api/auth/guest', {});
  }


  register(email, password, name) {
    return this.http.post<any>('../api/auth/register', {email, password, name});
  }

  isLogin() {
    return this.http.get<any>('../api/auth/isLogin');
  }

  logout() {
    localStorage.token = '';
    return of(true);
  }

  getLatestNumber() {
    return this.http.get<any>('../api/auth/getLatestNumber');
  }

  getNewNumber(caseNumber, orgNumber) {
    return this.http.post<any>('../api/auth/getNewNumber', {case: caseNumber, org: orgNumber});
  }

  cancelNumber(numberId) {
    return this.http.post<any>('../api/auth/cancelNumber', {id: numberId});
  }


  getHistory() {
    return this.http.get<any>('../api/auth/history').subscribe(x => this.onHistoryChange.next(x));
  }

  getOrgs() {
    return this.http.get<any>('../api/auth/getOrgs');
  }

  addOrg(orgName) {
    return this.http.post<any>('../api/auth/addOrg', {name: orgName});
  }

  deleteOrgByNum(orgID) {
    return this.http.post<any>('../api/auth/deleteOrgByNum', {org: orgID});
  }

  deleteOrgByName(orgName) {
    return this.http.post<any>('../api/auth/deleteOrgByName', {name: orgName});
  }

  getCases(orgID) {
    return this.http.post<any>('../api/auth/getCases', {org: orgID});
  }

  addCase(orgID, caseName, caseID) {
    return this.http.post<any>('../api/auth/addCase', {org: orgID, name: caseName, case: caseID});
  }

  deleteCaseByNum(orgID, caseID) {
    return this.http.post<any>('../api/auth/deleteCaseByNum', {org: orgID, case: caseID});
  }

  deleteCaseByName(orgID, caseName) {
    return this.http.post<any>('../api/auth/deleteCaseByName', {org: orgID, name: caseName});
  }
}
