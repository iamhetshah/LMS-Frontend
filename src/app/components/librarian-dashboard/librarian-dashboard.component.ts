import { afterNextRender, Component } from '@angular/core';
import { ServerService } from '../../services/server/server.service';
import { BookModel } from '../../models/book.model';

@Component({
  selector: 'app-librarian-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './librarian-dashboard.component.html',
  styleUrl: './librarian-dashboard.component.css',
})
export class LibrarianDashboardComponent {
  public myBooks: any[] = [];
  constructor(private http: ServerService) {
    this.http.get_book_personal().subscribe({
      next: (res: any) => {
        this.myBooks = res;
      },
    });
  }

  addBook(isbn: string, quantity: number) {
    this.http.add_book(isbn, quantity).subscribe({
      next: (res) => {},
    });
  }
}
