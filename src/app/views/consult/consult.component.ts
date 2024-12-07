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
    this.consultService.getData('resigns').subscribe(data => {
      this.categories['resigns'].data = data;
    });
  }

  selectCategory(category: DataType) {
    this.selectedCategory = category;

    /* this.consultService.getData(this.selectedCategory as DataType).subscribe(data => {
      this.data = data;
    }); */
  }

  getColumnValue(row: any, header: string): any {
    const key = header.toLowerCase().replace(/\s+/g, '');
    console.log(this.categories['resigns'].data)
    return row[key];
  }

  navigateToDetailedConsult(resignId: number) {
    console.log('Navigating to detailed consult for resignId:', resignId);
    this.router.navigate([`/consultar/${resignId}`]);
  }
}
