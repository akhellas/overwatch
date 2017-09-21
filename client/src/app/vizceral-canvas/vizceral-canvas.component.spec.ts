import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VizceralCanvasComponent } from './vizceral-canvas.component';

describe('VizceralCanvasComponent', () => {
  let component: VizceralCanvasComponent;
  let fixture: ComponentFixture<VizceralCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizceralCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizceralCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
