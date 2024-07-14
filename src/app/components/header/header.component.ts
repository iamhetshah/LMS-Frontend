import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  dropdownToggle = false;
  public user = inject(UserService);
  constructor() {}
}
