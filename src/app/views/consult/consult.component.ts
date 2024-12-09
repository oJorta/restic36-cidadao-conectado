import { Component, ViewChild } from '@angular/core';
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { Adment, DataType, FamilyScholarship, Resign } from '../../types/models';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ConsultService } from '../../services/consult/consult.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from "../../components/button/button.component";
import { NotificationService } from '../../services/notification/notification.service';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-consult',
  standalone: true,
  imports: [PageHeaderComponent, CurrencyPipe, ReactiveFormsModule, ButtonComponent, ToastComponent],
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.css'
})
export class ConsultComponent {
  @ViewChild(ToastComponent) toast!: ToastComponent;
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
      headers: ['Data de Referência', 'Valor', 'Quantidade de Beneficiados'],
      data: []
    },
    'adments': {
      headers: ['Ano', 'Tipo de Emenda', 'Autor', 'Localidade do Gasto', 'Valor Empenhado', 'Valor Pago'],
      data: []
    }
  };

  data: Resign[] = [];

  searchForm = new FormGroup({
    city: new FormControl('2913606'),
    month: new FormControl('10'),
    year: new FormControl('2020'),
  });

  constructor(
    private consultService: ConsultService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.fetchCategoryData(this.selectedCategory);
  }

  ngAfterViewInit() {
    this.notificationService.registerToastComponent(this.toast);
  }

  selectCategory(category: DataType) {
    this.selectedCategory = category;
    this.fetchCategoryData(category);
  }

  fetchCategoryData(category: DataType) {
    this.notificationService.showMessage('Carregando dados...');
    if (category === 'family-scholarships') {
      this.searchFamilyScholarships();
    } else {
      this.consultService.getData(category).subscribe((data: any[]) => {
        if (data.length === 0) {
          this.notificationService.showMessage('Nenhum dado encontrado para a categoria selecionada.');
          this.categories[category].data = [];
          this.categories[category].headers = [];
          return;
        }

        this.categories[category].data = data;
        this.categories[category].headers = Object.keys(data[0]).map(this.formatHeader);
        this.notificationService.showMessage('Dados carregados com sucesso.');
      });
    }
  }

  formatHeader(key: string): string {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  headerMapping: { [key: string]: string } = {
    'Data de Referência': 'dataReferencia',
    Valor: 'valor',
    'Quantidade de Beneficiados': 'quantidadeBeneficiados'
  };

  getColumnValue(row: any, header: string): any {
    const originalKey = this.headerMapping[header] || Object.keys(row).find((key) => this.formatHeader(key) === header);

    if (!originalKey) {
      console.warn(`Chave correspondente ao header "${header}" não encontrada no objeto:`, row);
      return '—';
    }

    return row[originalKey];
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

  searchFamilyScholarships(event?: Event) {
    event?.preventDefault();
    const city = this.searchForm.value.city ?? '';
    const date = (this.searchForm.value.year ?? '') + (this.searchForm.value.month ?? '');

    this.consultService.getData(this.selectedCategory, city, date).subscribe((data: Resign[] | FamilyScholarship[] | Adment[]) => {
      if (this.selectedCategory === 'family-scholarships') {
        if (data === null) {
          this.notificationService.showMessage('Nenhum dado encontrado para a busca realizada.');
          this.categories['family-scholarships'].data = [];
        } else {
          this.notificationService.showMessage('Busca realizada com sucesso.');
          this.categories['family-scholarships'].data = [data] as any[];
        }

      }
    });
  }
}
