import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-feed-post',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './feed-post.component.html',
  styleUrl: './feed-post.component.css'
})
export class FeedPostComponent {
  @Input() userId: string = '';
  @Input() userName: string = 'usuário';
  @Input() title: string = 'Título da postagem';
  @Input() date!: string;
  @Input() description: string = 'Descrição da postagem';
  @Input() likes: string[] = [];
  @Input() comments: string[] = [];
  @Input() tags!: string | undefined;

  formatedDate!: number;
  tagsArray: string[] = [];
  userLiked: boolean = false;
  isExpanded: boolean = false;

  constructor(
    private auth: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      const user = users.find(user => user.id === this.userId);
      console.log(users)
      this.userName = user?.name.split(' ')[0] || 'usuário';
    });

    this.auth.getUser().subscribe(user => {
      this.userLiked = this.likes.includes(user?.sub?.split('|')[1] || '');
    });

    const timeDifference = new Date().getTime() - new Date(this.date).getTime();
    this.formatedDate = Math.floor(timeDifference / (1000 * 60 * 60));
    this.tagsArray = this.tags ? this.tags.split(',') : [];
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  toggleLike() {

  }
}
