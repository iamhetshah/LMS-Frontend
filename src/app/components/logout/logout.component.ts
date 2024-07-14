import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  constructor(private user: UserService) {
    user.logout();
  }
}
