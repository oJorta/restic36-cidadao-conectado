import { Injectable } from '@angular/core';
import { Adment, DataType, FamilyScholarship, Resign } from '../../types/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {
  private apiUrl = 'http://localhost:5131/api/v1';

  constructor(private http: HttpClient) { }

  getData(type: DataType) {
    return this.http.get<Resign[] | FamilyScholarship[] | Adment[]>(`${this.apiUrl}/${type}`);
  }

  getDataById(type: DataType, id: number) {
    return this.http.get<Resign[] | FamilyScholarship[] | Adment[]>(`${this.apiUrl}/${type}/${id}`);
  }
}
