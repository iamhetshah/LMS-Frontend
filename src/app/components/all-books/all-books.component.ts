import { Component, computed, signal } from '@angular/core';
import { ServerService } from '../../services/server/server.service';
import { BookModel } from '../../models/book.model';
@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css',
})
export class AllBooksComponent {
  public books: any = signal([]);
  public toShowBooks: any = this.books.asReadonly();
  public page = signal(1);
  public size = signal(10);
  public total = signal(0);
  public query = '';
  constructor(private server: ServerService) {
    this.server.get_books(this.page(), this.size()).subscribe({
      next: (response) => {
        this.books.set(response.data);
      },
    });

    this.server.get_total_books().subscribe({
      next: (response) => {
        this.total.set(Math.ceil(response.data / this.size()));
      },
    });
  }

  pagination_down() {
    this.page.update((old) => {
      return old - 1;
    });

    this.server.get_books(this.page(), this.size()).subscribe({
      next: (response) => {
        this.books.set(response.data);
      },
    });
  }

  pagination_up() {
    this.page.update((old) => {
      return old + 1;
    });

    this.server.get_books(this.page(), this.size()).subscribe({
      next: (response) => {
        this.books.set(response.data);
      },
    });
  }

  filter() {
    this.toShowBooks.update((old: any) => {
      return old.filter((book: BookModel) => {
        return (
          book.author.includes(this.query.toLowerCase()) ||
          book.genre.includes(this.query.toLowerCase()) ||
          book.title.includes(this.query.toLowerCase())
        );
      });
    });
  }
}
