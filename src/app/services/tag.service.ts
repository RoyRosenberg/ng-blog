import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Tag } from '../shared/models/Tag';


@Injectable({
  providedIn: 'root'
})
export class TagService {
  private baseUrl = 'http://localhost:59253/api';

  constructor(private http: HttpClient) { }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.baseUrl}/Tags`);
  }
}
