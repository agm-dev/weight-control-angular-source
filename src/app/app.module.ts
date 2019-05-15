import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddDataComponent } from './add-data/add-data.component';
import { ReactiveFormsModule } from '@angular/forms';

import { LoggerService } from './logger.service';
import { StateService } from './state.service';

@NgModule({
  declarations: [
    AppComponent,
    AddDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    LoggerService,
    StateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
