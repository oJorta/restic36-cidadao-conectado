import { Component } from '@angular/core';
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { ResignService } from '../../services/resign/resign.service';

@Component({
  selector: 'app-consult',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.css'
})
export class ConsultComponent {
  selectedCategory: string = 'renuncias';

  constructor(
    private resignService: ResignService
  ) {}

  ngOnInit() {
    this.resignService.getResigns().subscribe(resigns => {
      console.log(resigns);
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}
