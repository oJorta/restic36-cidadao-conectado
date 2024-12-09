import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, PostRequest } from '../../types/models';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5131/api/v1/posts';


  constructor(private http: HttpClient) { }

  revalidatePost(postId: number) {
    return this.getDataById(postId);
  }

  getPosts() {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getDataById(id: number) {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  createPost(post: PostRequest) {
    return this.http.post<PostRequest>(this.apiUrl, post);
  }

  likePost(postId: number, userId: string) {
    console.log(`${this.apiUrl}/${postId}/likes`);
    return this.http.patch<{ userId: string }>(`${this.apiUrl}/${postId}/likes`, { userId });
  }

  simplerEndpointTest(postId: number){
    return this.http.patch<{}>(`${this.apiUrl}/${postId}/likes1`, {});
  }

  unlikePost(postId: number, likeId: number | undefined){
    return this.http.delete(`${this.apiUrl}/${postId}/likes/${likeId}`);
  }
}
