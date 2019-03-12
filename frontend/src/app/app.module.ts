import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {QRCodeModule} from 'angularx-qrcode';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
