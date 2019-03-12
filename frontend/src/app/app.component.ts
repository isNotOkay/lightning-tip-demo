import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  invoice: string;

  constructor(private http: HttpClient) {
  }

  tip() {
    this.http.get('http://localhost:3000/tip').subscribe((res: any) => {
      this.invoice = res.payment_request;
    });
  }
}
