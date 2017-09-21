import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import Vizceral from 'vizceral';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public viz: any;

  constructor(private http: Http) { }

  ngOnInit() {



    // let timer = Observable.timer(5000, 10000);
    // timer.subscribe(tick => this.onTrafficUpdate(this.data));
  }

  vizViewChanged(view) {
    console.log('viewChanged', view);
  }

  vizObjectHighlighted(object) {
    console.log('objectHighlight', object);
  }

  vizRendered(data) {
    console.log('rendered', data);
  }

  vizNodeContextSizeChanged(dimensions) {
    console.log('vizNodeContextSizeChanged', dimensions);
  }

  getData() {
    return { 
      "name": "LDAP", 
      "renderer": "global", 
      "layout": "ltrTree", 
      "nodes": [
        { "name": "ldap_1" }, 
        { "name": "client_1" }, 
        { "name": "ldap_db1" }, 
        { "name": "ldap_2" }, 
        { "name": "client_2" }, 
        { "name": "ldap_db1" }
      ], 
      "connections": [
        { "source": "client_1", "target": "ldap_1", "metrics": { "normal": 12, "danger": 0 }, "metadata": { "streaming": true } }, 
        { "source": "ldap_1", "target": "ldap_db1", "metrics": { "normal": 25, "danger": 0 }, "metadata": { "streaming": true } }, 
        { "source": "client_2", "target": "ldap_2", "metrics": { "normal": 102, "danger": 1 }, "metadata": { "streaming": true } }, 
        { "source": "ldap_2", "target": "ldap_db1", "metrics": { "normal": 25, "danger": 0 }, "metadata": { "streaming": true } }
      ] };
  }
}
