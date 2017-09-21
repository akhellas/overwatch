import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VizceralCanvasComponent } from './vizceral-canvas/vizceral-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    VizceralCanvasComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
