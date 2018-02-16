import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverwatchComponent } from './overwatch.component';

describe('OverwatchComponent', () => {
  let component: OverwatchComponent;
  let fixture: ComponentFixture<OverwatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverwatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverwatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
