import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent {
  @Input() title: string = 'Título da página';
  isAuthenticated!: boolean;
  currentUrl?: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
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
