import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../types/models';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5131/api/v1/posts';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getDataById(id: number) {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  createPost(post: Partial<Post>) {
    return this.http.post(this.apiUrl, post);
  }
}
