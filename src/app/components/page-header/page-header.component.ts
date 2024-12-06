import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@auth0/auth0-angular';

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
  profile!: User | null | undefined;
  isAuthenticated!: boolean;
  currentUrl?: string;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute
  ) { }

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

  setTitle() {
    switch (this.currentUrl) {
      case '/feed':
        this.title = 'Feed';
        break;
      case '/novo-topico':
        this.title = 'Criar novo tópico';
        break;
      case '/consultar':
        this.title = 'Consultar';
        break;
    }
  }

}
