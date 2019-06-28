import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-domain',
  templateUrl: './new-domain.component.html',
  styleUrls: ['./new-domain.component.css']
})
export class NewDomainComponent implements OnInit {
  constructor(private loginService: LoginService) { }
  dot = '.';
  endingControl = new FormControl('');
  name = '';

  ngOnInit() {
  }

  onChange(e) {
    e.preventDefault();
  }

  onUnlock() {
    this.loginService.getBike(this.endingControl.value).subscribe(x => {
      console.log(x);
    });
  }
}
