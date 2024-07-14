import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookModel } from '../../models/book.model';
import { BASE_URL } from '../../utils/ip';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private baseURL = BASE_URL;
  constructor(private http: HttpClient) {}

  get_home_data() {
    return [
      this.http.get(this.baseURL + 'public/book/new-arrival'),
      this.http.get(this.baseURL + 'public/book/trending'),
    ];
  }

  get_books(page: number, size: number) {
    return this.http.get<{
      data: BookModel[];
      message: string;
      statusCode: number;
    }>(this.baseURL + 'public/book', {
      params: { page, size },
    });
  }

  get_total_books() {
    return this.http.get<{
      data: number;
      message: string;
      statusCode: number;
    }>(this.baseURL + 'public/book/quantity');
  }
}
