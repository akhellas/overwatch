import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core'
import Vizceral from 'vizceral'

@Component({
  selector: 'app-overwatch',
  templateUrl: './overwatch.component.html',
  styleUrls: ['./overwatch.component.css']
})
export class OverwatchComponent implements OnInit, OnChanges {
  @Input() traffic: any

  public vizceral

  public get canvas() {
    return document.getElementById('vizCanvas')
  }

  constructor() {}

  ngOnInit() {
    this.vizceral = new Vizceral(document.getElementById('vizCanvas'))

    //this.updateStyles({})

    this.vizceral.on('viewChanged', () => {})
    this.vizceral.on('objectHighlighted', () => {})
    this.vizceral.on('objectHovered', () => {})
    this.vizceral.on('nodeUpdated', () => {})
    this.vizceral.on('nodeContextSizeChanged', () => {})
    this.vizceral.on('matchesFound', () => {})
    this.vizceral.on('viewUpdated', () => {})

    this.vizceral.setOptions({
      allowDraggingOfNodes: false,
      showLabels: true
    })

    setTimeout(() => {
      this.vizceral.setView()
      this.vizceral.updateData(this.traffic)
      this.vizceral.animate()
      this.vizceral.updateBoundingRectCache()
    }, 0)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.vizceral) {
      return
    }
    this.vizceral.updateData(this.traffic)
  }
}
