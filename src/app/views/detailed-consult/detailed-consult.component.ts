import { Component } from '@angular/core';
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { Adment, DataType, FamilyScholarship, Resign } from '../../types/models';
import { ActivatedRoute } from '@angular/router';
import { ConsultService } from '../../services/consult/consult.service';

@Component({
  selector: 'app-detailed-consult',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './detailed-consult.component.html',
  styleUrl: './detailed-consult.component.css'
})
export class DetailedConsultComponent {
  category!: DataType;
  categoryName!: string;
  resourceId!: number;

  resource: {
    headers: { originalKey: string, formatted: string }[],
    data: Resign[] | FamilyScholarship[] | Adment[];
  } = {
    headers: [],
    data: []
  };

  constructor(
    private consultService: ConsultService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.category = this.route.snapshot.params['category'];
    this.resourceId = this.route.snapshot.params['id'];
    this.categoryName = this.category === 'resigns' ? 'Renúncia Fiscal' : this.category === 'family-scholarships' ? 'Bolsa Família' : 'Emenda Parlamentar';

    this.consultService.getDataById(this.category, this.resourceId).subscribe(data => {
      if (data.length === 0) {
        console.warn(`Nenhum dado encontrado para a categoria ${this.category}`);
        this.resource.data = [];
        this.resource.headers = [];
        return;
      }

      this.resource.data = data;

      this.resource.headers = Object.keys(data).map((key) => ({
        originalKey: key,
        formatted: this.formatHeader(key)
      }));
    });
  }

  formatHeader(key: string): string {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  getColumnValue(row: any, formattedHeader: string): any {
    const mapping = this.resource.headers.find(header => header.formatted === formattedHeader);

    if (!mapping) {
      console.warn(`Chave correspondente ao header "${formattedHeader}" não encontrada.`);
      return '—';
    }

    return row[mapping.originalKey] ?? '—';
  }
}
