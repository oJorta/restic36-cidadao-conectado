import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-feed-post',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './feed-post.component.html',
  styleUrl: './feed-post.component.css'
})
export class FeedPostComponent {
  @Input() userName: string = 'usuário';
  @Input() title: string = 'Título da postagem';
  @Input() date: Date = new Date();
  @Input() description: string = 'Descrição da postagem';
  @Input() likes: number = 0;
  @Input() comments: number = 0;

  formatedDate: number = new Date().getHours() - this.date.getHours();
  isExpanded: boolean = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
