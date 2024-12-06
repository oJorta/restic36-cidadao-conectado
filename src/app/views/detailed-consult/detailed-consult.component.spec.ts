import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedConsultComponent } from './detailed-consult.component';

describe('DetailedConsultComponent', () => {
  let component: DetailedConsultComponent;
  let fixture: ComponentFixture<DetailedConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedConsultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
