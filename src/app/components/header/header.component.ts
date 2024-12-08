import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { filter } from 'rxjs';
import { UserProfileComponent } from "../user-profile/user-profile.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterModule, UserProfileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isAuthenticated!: boolean;
  isAtHome!: boolean;

  constructor(
    private router: Router,
    private auth: AuthService
  ){ }
  
  ngOnInit(): void {
    this.setIsAtHome();
    this.auth.isAuthenticated().subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

  login(): void {
    this.auth.login();
    //api call to save user in db goes here
  }

  setIsAtHome() {
    return this.router.events
                      .pipe(filter(event => event instanceof NavigationEnd))
                      .subscribe(event => this.isAtHome = event.url === '/')
  }

  onRouterLinkActive(routerLink: any) {
    console.log('routerLink', routerLink);
  }
}
