import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { SortByField, SortOrder } from '../../types/models';
import { FeedPostComponent } from "../../components/feed-post/feed-post.component";
import { ButtonComponent } from "../../components/button/button.component";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [ButtonComponent, FeedPostComponent, PageHeaderComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  sortBy: SortByField = 'date';
  sortOrder: SortOrder = 'desc';

  constructor(private auth: AuthService) {}

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({
      logoutParams: {returnTo: window.location.origin},
    });
  }

  sortPosts(sortBy: SortByField, sortOrder: SortOrder) {
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
  }

  toggleSort(sortBy: SortByField) {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortPosts(sortBy, this.sortOrder);
  }

}
