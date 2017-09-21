import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import Vizceral from 'vizceral';

@Component({
  selector: 'app-vizceral-canvas',
  templateUrl: './vizceral-canvas.component.html',
  styleUrls: ['./vizceral-canvas.component.css']
})

export class VizceralCanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('vizcanvas') vizCanvas: ElementRef;

  constructor(private http: Http) { }

  ngOnInit() { }

  ngAfterViewInit() {
    var viz = new Vizceral(this.vizCanvas.nativeElement);
    viz.setView();
    viz.animate();
    
    // this.viz.on('viewChanged', view => this.vizViewChanged(view));
    // this.viz.on('objectHighlighted', object => this.vizObjectHighlighted(object));
    // this.viz.on('rendered', data => this.vizRendered(data));
    // this.viz.on('nodeContextSizeChanged', dimensions => this.vizNodeContextSizeChanged(dimensions));
    this.http.get('assets/sample_data.json').subscribe(res => {
      viz.updateData(res.json());

    });
  }

}
