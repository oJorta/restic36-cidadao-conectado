import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '@auth0/auth0-angular';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  profile!: User | null | undefined;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe(profile => this.profile = profile);
  }

  logout(): void {
    this.auth.logout();
  }
}
