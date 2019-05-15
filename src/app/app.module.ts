import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js'
PlotlyModule.plotlyjs = PlotlyJS;

import { LoggerService } from './logger.service';
import { StateService } from './state.service';

import { AppComponent } from './app.component';
import { AddDataComponent } from './add-data/add-data.component';
import { GraphComponent } from './graph/graph.component';
import { SettingsComponent } from './settings/settings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AddDataComponent,
    GraphComponent,
    SettingsComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PlotlyModule,
  ],
  providers: [
    LoggerService,
    StateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
