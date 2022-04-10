import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { HighchartsChartModule } from 'highcharts-angular';

import { MaterialModule } from './_modules/material.module';
import { AppRoutingModule } from './app-routing.module';

import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './_components/header/header.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { CityForecastDetailsComponent } from './_components/city-forecast-details/city-forecast-details.component';
import { CityListComponent } from './_components/city-list/city-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    CityForecastDetailsComponent,
    CityListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
