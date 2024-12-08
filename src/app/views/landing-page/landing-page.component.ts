import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }
  
  ngOnInit(): void {
      this.auth.isAuthenticated().subscribe((isAuthenticated) => {
        if(isAuthenticated)
          return this.getStarted();
      })
  }

  getStarted() {
    this.router.navigate(['/feed']);
  }
}
