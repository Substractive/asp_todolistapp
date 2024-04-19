import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { ListeComponent } from './liste/liste.component';
import { ZadaciComponent } from './zadaci/zadaci.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { UrediListuComponent } from './uredi-listu/uredi-listu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListeComponent,
    ZadaciComponent,
    NavComponent,
    UrediListuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
