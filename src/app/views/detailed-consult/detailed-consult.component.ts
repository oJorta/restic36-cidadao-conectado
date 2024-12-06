import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";

@Component({
  selector: 'app-detailed-consult',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './detailed-consult.component.html',
  styleUrl: './detailed-consult.component.css'
})
export class DetailedConsultComponent {

}
