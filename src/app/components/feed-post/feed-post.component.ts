import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { Like } from '../../types/models';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-feed-post',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './feed-post.component.html',
  styleUrl: './feed-post.component.css'
})
export class FeedPostComponent {
  @Input() id!: number;
  @Input() userId: string = '';
  @Input() userName: string = 'usuário';
  @Input() title: string = 'Título da postagem';
  @Input() date!: string;
  @Input() description: string = 'Descrição da postagem';
  @Input() likes: Like[] = [];
  @Input() comments: string[] = [];
  @Input() tags!: string | undefined;

  formatedDate!: number;
  tagsArray: string[] = [];
  userLiked: boolean = false;
  isExpanded: boolean = false;

  authUserId!: string

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      const user = users.find(user => user.id === this.userId);
      this.userName = user?.name || 'usuário';
    });

    this.auth.getUser().subscribe(user => {
      console.log(user);
      this.authUserId = user?.sub?.split('|')[1] || '';
      this.userLiked = this.likes.some(like => like.userId === this.authUserId);
    });

    const timeDifference = new Date().getTime() - new Date(this.date).getTime();
    this.formatedDate = Math.floor(timeDifference / (1000 * 60 * 60));
    this.tagsArray = this.tags ? this.tags.split(',') : [];
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  toggleLike() {
    this.userLiked = !this.userLiked;
    const request = this.userLiked
      ? this.postService.likePost(this.id, this.authUserId)
      : this.postService.unlikePost(this.id, this.getLikeId(this.authUserId)!);

    request.subscribe(() => this.revalidatePost(this.id));
  }

  getLikeId(userId: string): number | undefined{
    return this.likes.find(like => like.userId === userId)?.likeId;
  }

  revalidatePost(postId: number) {
    this.postService.revalidatePost(postId).subscribe((data) => this.likes = data.likes);
  }
}
