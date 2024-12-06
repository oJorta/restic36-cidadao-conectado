import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resign } from '../../types/models';

@Injectable({
  providedIn: 'root'
})
export class ResignService {
  private apiUrl = 'http://localhost:5131/api/v1';

  constructor(private http: HttpClient) { }

  getResigns() {
    return this.http.get<Resign[]>(`${this.apiUrl}/resigns`);
  }

  getResignById(resignId: number) {
    return this.http.get<Resign>(`${this.apiUrl}/resigns/${resignId}`);
  }
}
