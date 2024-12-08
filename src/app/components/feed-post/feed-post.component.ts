import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { DatePipe } from '@angular/common';

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
  @Input() date!: string;
  @Input() description: string = 'Descrição da postagem';
  @Input() likes: string[] = [];
  @Input() comments: string[] = [];
  @Input() tags!: string | undefined;

  formatedDate!: number;
  isExpanded: boolean = false;

  ngOnInit() {
    const timeDifference = new Date().getTime() - new Date(this.date).getTime();
    this.formatedDate = Math.floor(timeDifference / (1000 * 60 * 60));
    console.log(this.tags);
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  toggleLike() {

  }
}
