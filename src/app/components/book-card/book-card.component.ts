import { Component, Input } from '@angular/core';
import { BookModel } from '../../models/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent {
  @Input({ required: true }) bookData!: BookModel | any;
}
