import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { _ } from 'underscore';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  orgs = [];
  objectKeys = Object.keys;

  ngOnInit() {
    this.loginService.getOrgs().subscribe(a => {
      this.orgs = a;
    });
  }

  add() {
    this.loginService.addOrg("alma", '1').subscribe(x => {
      this.loginService.getOrgs().subscribe(a => {
        this.orgs = a;
      });
    });
    
  }

}
