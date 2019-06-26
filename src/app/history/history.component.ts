import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  history = [];

  ngOnInit() {
    this.loginService.getHistory().subscribe(x => {
      this.history = x;
    });

  }

}
