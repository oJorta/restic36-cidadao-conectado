import { Component } from '@angular/core';
import { PageHeaderComponent } from "../../components/page-header/page-header.component";

@Component({
  selector: 'app-consult',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.css'
})
export class ConsultComponent {
  selectedCategory: string = 'renuncias';

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}
