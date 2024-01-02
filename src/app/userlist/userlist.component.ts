import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

interface User {
  id: number;
  name: string;
  email: string;
  mobileNumber: string;
  age: number;
  gender: string;
}

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit{

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  editUser() {
    
  }

  deleteUser(user:User): void {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
      console.log('Deleted user:', user);
      // You may want to make an API call to delete the user on the server.
    }
  }
  

}
