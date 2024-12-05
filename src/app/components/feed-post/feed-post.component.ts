import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-feed-post',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './feed-post.component.html',
  styleUrl: './feed-post.component.css'
})
export class FeedPostComponent {

}
