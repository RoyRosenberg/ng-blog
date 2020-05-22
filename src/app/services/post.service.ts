import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Post } from '../shared/models/Post';
import { PagingResponse, PostFilter } from '../shared/models/postFilter';

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
}
