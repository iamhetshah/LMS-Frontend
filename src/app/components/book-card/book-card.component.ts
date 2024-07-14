import { Component, Input } from '@angular/core';
import { BookModel } from '../../models/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent {
  @Input({ required: true }) bookData!: BookModel | any;
  constructor(private router: Router) {}
  routeToBook() {
    console.log('ferdv');

    this.router.navigate(['/book/' + this.bookData.isbn]);
  }
}
