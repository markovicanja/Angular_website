import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  users: User[];

  getAllUsers() {
    this.service.getAllUsers().subscribe((u: User[]) => {
      this.users = u;
    })
  }

  editUser(user: User) {

  }

  deleteUser(user: User) {
    this.service.deleteUser(user.username, user.type).subscribe(res => {
      this.getAllUsers();
    }) 
  }

  addUser(user: User) {

  }

}
