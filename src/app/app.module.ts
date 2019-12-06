import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TreeComponent} from './tree/tree.component';
import {Treev2Component} from './treev2/treev2.component';


@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    Treev2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
