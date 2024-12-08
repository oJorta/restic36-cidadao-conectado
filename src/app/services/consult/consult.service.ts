import { Injectable } from '@angular/core';
import { Adment, DataType, FamilyScholarship, Resign } from '../../types/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {
  private apiUrl = 'http://localhost:5131/api/v1';

  constructor(private http: HttpClient) { }

  getData(type: DataType, city?: string, date?: string): Observable<Resign[] | FamilyScholarship[] | Adment[]> {
    console.log('city', city);
    console.log('date', date);
    if (type === 'family-scholarships') {
      return this.http.get<FamilyScholarship[]>(`${this.apiUrl}/${type}?yearMonthDate=${date}&cityIbgeCode=${city}`);
    } else {
      return this.http.get<Resign[] | Adment[]>(`${this.apiUrl}/${type}`);
    }
  }

  getDataById(type: DataType, id: number) {
    return this.http.get<Resign[] | FamilyScholarship[] | Adment[]>(`${this.apiUrl}/${type}/${id}`);
  }
}
