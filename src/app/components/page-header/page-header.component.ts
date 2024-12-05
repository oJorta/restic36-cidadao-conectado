import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { AuthService } from '../../services/auth/auth.service';
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent {
  @Input() title: string = 'Título da página';

  profile!: User | null | undefined;
  isAuthenticated!: boolean;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getUser().subscribe(profile => this.profile = profile);

    this.auth.isAuthenticated().subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

  login () {
    this.auth.login();
  }

  logout () {
    this.auth.logout();
  }

}
