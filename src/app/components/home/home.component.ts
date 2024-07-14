import { Component, signal } from '@angular/core';
import { ServerService } from '../../services/server/server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  newArrival = signal([]);
  trending = signal([]);
  constructor(private server: ServerService) {
    const [newArrivalReq, trendingReq] = this.server.get_home_data();

    newArrivalReq.subscribe({
      next: (response: any) => {
        this.newArrival.set(response.data);
      },
    });

    trendingReq.subscribe({
      next: (response: any) => {
        this.trending.set(response.data);
      },
    });
  }
}
