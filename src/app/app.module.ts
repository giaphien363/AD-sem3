import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { Ass1Component } from './ass1/ass1.component';
import { FinalAssComponent } from './final-ass/final-ass.component';

import { ProductService } from './final-ass/product.service';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    Ass1Component,
    FinalAssComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
