import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { Resign } from '../../types/models';
import { ResignService } from '../../services/resign/resign.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailed-consult',
  standalone: true,
  imports: [PageHeaderComponent, CurrencyPipe],
  templateUrl: './detailed-consult.component.html',
  styleUrl: './detailed-consult.component.css'
})
export class DetailedConsultComponent {
  resign!: Resign;
  resignId!: number;
  constructor(
    private resignService: ResignService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.resignService.getResigns().subscribe(data => {
      this.resignId = this.route.snapshot.params['id'];
      this.resign = data[this.resignId];
      console.log('Resign:', this.resign);
    });
  }



}
