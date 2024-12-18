import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostInteraction, User } from '../../types/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5131/api/v1';

  constructor(
    private http: HttpClient,
  ) { }

  getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: string) {
    return this.http.get<User[]>(`${this.apiUrl}/users/${id}`);
  }

  getUserByEmail(email: string) {
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${email}`)
  }

  createUser(user: Partial<User>) {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  addInteraction(postId: number, userId: string) {
    return this.http.post<PostInteraction>(`${this.apiUrl}/likes`, { postId, userId });
  }

  removeInteraction(interactionId: string) {
    return this.http.delete(`${this.apiUrl}/likes/${interactionId}`);
  }
}
