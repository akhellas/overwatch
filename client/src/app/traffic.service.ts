import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TrafficService {
  
  private uri = 'http://localhost:3000/metrics/2017/9/19';
  constructor(private http: Http) { }

  getTraffic(): Observable<any> {
    return this.http.get(this.uri).map(res => res.json());
  }
}
