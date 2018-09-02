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
  domains = [];
  endingControl = new FormControl('');
  name = '';

  ngOnInit() {
    this.loginService.endings().subscribe(x => {
      this.domains = x;
    });
  }

  onChange(e) {
    e.preventDefault();
  }

  onSave() {
    console.log(this.endingControl.value);
    console.log(this.name);
  }
}
