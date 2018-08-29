import { HandsonTableComponent } from './handson-table/handson-table.component';
import { HotTableService } from './handson-table/handson-table.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HotTableModule, HotTableRegisterer } from '@handsontable/angular';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HandsonTableComponent
  ],
  imports: [
    BrowserModule,
    HotTableModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    HotTableService,
    HotTableRegisterer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
