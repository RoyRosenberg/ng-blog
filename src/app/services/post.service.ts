import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Post } from '../models/Post';
import { PagingResponse, PostFilter } from '../models/postFilter';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:59253/api';

  constructor(private http: HttpClient) { }

  getPosts(filter: PostFilter): Observable<PagingResponse<Post>> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(filter);
    return this.http.post<PagingResponse<Post>>(`${this.baseUrl}/PostQuery`, body, { headers: header });
  }

  createPost(post: Post): Observable<Post> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(post);
    return this.http.post<Post>(`${this.baseUrl}/Posts`, body, { headers: header });
  }

  updatePost(post: Post): Observable<Post> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(post);
    return this.http.put<Post>(`${this.baseUrl}/Posts`, body, { headers: header });
  }
}
