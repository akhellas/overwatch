import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import Vizceral from 'vizceral';

import { NodeManager, RootNode } from '../models';

import { TrafficService } from '../traffic.service';

@Component({
  selector: 'app-vizceral-canvas',
  templateUrl: './vizceral-canvas.component.html',
  styleUrls: ['./vizceral-canvas.component.css']
})

export class VizceralCanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('vizcanvas') vizCanvas: ElementRef;

  constructor(private trafficService: TrafficService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    var viz = new Vizceral(this.vizCanvas.nativeElement);

    // this.viz.on('viewChanged', view => this.vizViewChanged(view));
    // this.viz.on('objectHighlighted', object => this.vizObjectHighlighted(object));
    // this.viz.on('rendered', data => this.vizRendered(data));
    // this.viz.on('nodeContextSizeChanged', dimensions => this.vizNodeContextSizeChanged(dimensions));
    
    viz.updateData(NodeManager.getSampleTraffic());

    viz.setView();
    viz.animate();
  }
}
