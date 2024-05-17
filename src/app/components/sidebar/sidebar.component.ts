import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  username: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.username = this.userService.getUsername();
  }
}
