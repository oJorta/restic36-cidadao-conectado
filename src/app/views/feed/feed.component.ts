import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

import { Post, PostRequest, SortByField, SortOrder } from '../../types/models';
import { FeedPostComponent } from "../../components/feed-post/feed-post.component";
import { ButtonComponent } from "../../components/button/button.component";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { PostService } from '../../services/post/post.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification/notification.service';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [ButtonComponent, FeedPostComponent, PageHeaderComponent, ReactiveFormsModule, ToastComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  @ViewChild(ToastComponent) toast!: ToastComponent;
  posts: Post[] = [];
  sortBy: SortByField = 'date';
  sortOrder: SortOrder = 'desc';
  isCreatePostModalOpen: boolean = false;

  postForm = new FormGroup({
    title: new FormControl(''),
    desc: new FormControl(''),
    tags: new FormControl(''),
  });

  constructor(
    private auth: AuthService,
    private postService: PostService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(posts => {
      console.log(posts);
      this.posts = posts;
      this.sortPosts(this.sortBy, this.sortOrder);
    });
  }

  ngAfterViewInit() {
    this.notificationService.registerToastComponent(this.toast);
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
    this.auth.isAuthenticated().subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        this.notificationService.showMessage('Você precisa estar logado para criar uma postagem.');
      } else {
        this.isCreatePostModalOpen = !this.isCreatePostModalOpen;
      }
    });
  }

  createPost() {
    this.isCreatePostModalOpen = false;
    this.auth.getUser().subscribe(user => {
      const newPost: PostRequest = {
        userId: user?.sub?.split('|')[1]!,
        title: this.postForm.value.title!,
        desc: this.postForm.value.desc!,
        tags: this.postForm.value.tags?.split(' ').join(',')!,
      }
      console.log(newPost);
      this.postService.createPost(newPost).subscribe((response) => {
        console.log(response);
        console.log('post criado');
        this.postService.getPosts().subscribe(posts => {
          this.posts = posts
          this.sortPosts(this.sortBy, this.sortOrder);
        });
      });
    });
  }
}
