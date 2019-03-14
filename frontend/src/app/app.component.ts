import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // replace this with your node's URI
  nodeUri = 'asjkrncbksajbxhbknajnxdkashnxdmjkasdmnxjkasndkjasxdmandxmknjasdasrcvdfhgfrctckjnkjwshnckfjsghbfcxnksh';
  invoice: string;
  loading = false;

  constructor(private http: HttpClient) {
  }

  tip() {
    this.loading = true;
    this.http.get('http://localhost:3000/tip').subscribe((res: any) => {
      this.loading = false;
      this.invoice = res.payment_request;
    });
  }
}
