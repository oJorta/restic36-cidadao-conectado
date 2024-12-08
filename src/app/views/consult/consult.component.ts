import { Component } from '@angular/core';
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { Adment, DataType, FamilyScholarship, Resign } from '../../types/models';
import { CurrencyPipe } from '@angular/common';
import { Data, Router } from '@angular/router';
import { ConsultService } from '../../services/consult/consult.service';

@Component({
  selector: 'app-consult',
  standalone: true,
  imports: [PageHeaderComponent, CurrencyPipe],
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.css'
})
export class ConsultComponent {
  selectedCategory: DataType = 'resigns';
  categories: {
    resigns: { headers: string[]; data: Resign[] };
    'family-scholarships': { headers: string[]; data: FamilyScholarship[] };
    adments: { headers: string[]; data: Adment[] };
  } = {
    'resigns': {
      headers: ['Ano', 'Tipo de Renúncia', 'Valor Renunciado', 'Tributo', 'Razão Social', 'Município', 'UF'],
      data: []
    },
    'family-scholarships': {
      headers: ['Data de Referência', 'Município', 'Tipo', 'Valor', 'Quantidade de Beneficiados'],
      data: []
    },
    'adments': {
      headers: ['Ano', 'Tipo de Emenda', 'Autor', 'Localidade do Gasto', 'Valor Empenhado', 'Valor Pago'],
      data: []
    }
  };

  data: Resign[] = [];

  constructor(
    private consultService: ConsultService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchCategoryData(this.selectedCategory);
  }

  selectCategory(category: DataType) {
    this.selectedCategory = category;
    this.fetchCategoryData(category);
  }

  fetchCategoryData(category: DataType) {
    this.consultService.getData(category).subscribe((data: any[]) => {
      if (data.length === 0) {
        console.warn(`Nenhum dado encontrado para a categoria ${category}`);
        this.categories[category].data = [];
        this.categories[category].headers = [];
        return;
      }

      this.categories[category].data = data;
      this.categories[category].headers = Object.keys(data[0]).map(this.formatHeader);

      console.log('Headers formatados:', this.categories[category].headers);
      console.log('Chaves dos dados:', Object.keys(data[0]));
    });
  }

  formatHeader(key: string): string {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  getColumnValue(row: any, header: string): any {
    const originalKey = Object.keys(row).find((key) => this.formatHeader(key) === header);

    if (!originalKey) {
      console.warn(`Chave correspondente ao header "${header}" não encontrada no objeto:`, row);
    }

    return originalKey ? row[originalKey] : '—';
  }

  navigateToDetailedConsult(resignId: number) {
    switch (this.selectedCategory) {
      case 'resigns':
        this.router.navigate([`/consultar/resigns/${resignId}`]);
        break;
      case 'family-scholarships':
        this.router.navigate([`/consultar/family-scholarships/${resignId}`]);
        break;
      case 'adments':
        this.router.navigate([`/consultar/adments/${resignId}`]);
        break;
    }
  }
}
