import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent {
  @Input() title: string = 'Título da página';

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login();
  }

}
