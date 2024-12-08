import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { Post, SortByField, SortOrder } from '../../types/models';
import { FeedPostComponent } from "../../components/feed-post/feed-post.component";
import { ButtonComponent } from "../../components/button/button.component";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { PostService } from '../../services/post/post.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [ButtonComponent, FeedPostComponent, PageHeaderComponent, ReactiveFormsModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  posts: Post[] = [];
  sortBy: SortByField = 'date';
  sortOrder: SortOrder = 'desc';
  isCreatePostModalOpen: boolean = true;

  postForm = new FormGroup({
    title: new FormControl(''),
    desc: new FormControl(''),
    tags: new FormControl(''),
  });

  constructor(
    private auth: AuthService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

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

    this.posts = this.posts.sort((a, b) => {
      if (sortBy === 'likes') {
        return sortOrder === 'asc' ? a.likes.length - b.likes.length : b.likes.length - a.likes.length;
      }

      if (sortBy === 'comments') {
        return sortOrder === 'asc' ? a.comments.length - b.comments.length : b.comments.length - a.comments.length;
      }

      if (sortBy === 'date') {
        return sortOrder === 'asc' ? new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime() : new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      }

      return 0;
    });
  }

  toggleSort(sortBy: SortByField) {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortPosts(sortBy, this.sortOrder);
  }

  toggleCreatePostModal() {
    this.isCreatePostModalOpen = !this.isCreatePostModalOpen;

  }

  createPost() {
    const newPost: Partial<Post> = {
      userId: '1',
      title: this.postForm.value.title!,
      desc: this.postForm.value.desc!,
      tags: this.postForm.value.tags?.split(' ').join(',')!,
    }
    console.log(newPost);
    this.postService.createPost(newPost).subscribe(() => {
      this.postService.getPosts().subscribe(posts => this.posts = posts);
    });
  }


}
