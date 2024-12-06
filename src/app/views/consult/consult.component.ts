import { Component } from '@angular/core';
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { ResignService } from '../../services/resign/resign.service';
import { Resign } from '../../types/models';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consult',
  standalone: true,
  imports: [PageHeaderComponent, CurrencyPipe],
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.css'
})
export class ConsultComponent {
  selectedCategory: string = 'renuncias';
  data: Resign[] = [];

  constructor(
    private resignService: ResignService,
    private router: Router
  ) {}

  ngOnInit() {
    this.resignService.getResigns().subscribe(resigns => {
      this.data = resigns;
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  navigateToDetailedConsult(resignId: number) {
    console.log('Navigating to detailed consult for resignId:', resignId);
    this.router.navigate([`/consultar/${resignId}`]);
  }
}
