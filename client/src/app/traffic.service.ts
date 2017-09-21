import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TrafficService {
  
  private uri = 'http://localhost:3000/metrics/2017/9/19';
  constructor(private http: Http) { }

  getTraffic(): Observable<any> {
    return this.http.get(this.uri).map(res => {
      return this.transformTraffic(res.json());
    });
  }

  transformTraffic(traffic: any[]): any {
    var data = {
      renderer: 'global',
      name: 'edge',
      entryNode: 'INTERNET',
      nodes: [
        {
          renderer: 'region',
          layout: 'ltrTree',
          name: 'gea',
          
        }
      ]
    };

    var nodes: { [host: string] : any } = {};

    traffic.forEach(item => {
      if (item.StatusCode == 401) {
        return;
      }
      let host = `${item.Host.split('.')[0]}.${item.Host.split('.')[1]}`;

      if (nodes[host] == null) {
        nodes[host] = {
          name: host,
          updated: item.timestamp,
          maxVolume: 100000
        };
      }

      let node = nodes[host];


      data.push({
        host: hosts[0] + '.' + hosts[1],
        user: item.User,
        timestamp: item.Timestamp,
        duration: item.Duration,
        error: item.StatusCode >= 400,
        size: item.Size
      });
    });

    console.log(data);
    return data;
  }
}
