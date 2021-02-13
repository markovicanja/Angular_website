import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  name: string;
  surname: string;
  username: string;
  password: string;
  repeatedPassword: string;
  index: string;
  type: string;

  register() {
  
  }

}
