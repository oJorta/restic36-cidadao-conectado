import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";

import { SortByField, SortOrder } from '../../types/models';
import { FeedPostComponent } from "../../components/feed-post/feed-post.component";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [ButtonComponent, FeedPostComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  sortBy: SortByField = 'date';
  sortOrder: SortOrder = 'desc';

  sortPosts(sortBy: SortByField, sortOrder: SortOrder) {
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
  }

  toggleSort(sortBy: SortByField) {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortPosts(sortBy, this.sortOrder);
  }

}
