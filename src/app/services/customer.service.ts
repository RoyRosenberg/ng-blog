import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Customer } from '../shared/models/Customer';




@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:59253/api';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/Customers`);
  }

  updateCustomer(customer: Customer): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(customer);
    console.log('put customer', customer);
    return this.http.put(`${this.baseUrl}/Customers`, body, { headers: header });
  }
}
