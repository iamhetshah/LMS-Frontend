import { Component } from '@angular/core';
import { ServerService } from '../../services/server/server.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BASE_URL } from '../../utils/ip';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.css',
})
export class BookPageComponent {
  book = {};
  constructor(private http: HttpClient, private routeSnapshot: ActivatedRoute) {
    this.http
      .get(
        BASE_URL + 'public/book/isbn/' + routeSnapshot.snapshot.params['isbn']
      )
      .subscribe({
        next: (res) => {
          console.log(res);
        },
      });
  }
}
