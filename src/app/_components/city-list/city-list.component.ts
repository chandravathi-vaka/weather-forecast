import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { IOwFireStoreCity } from 'src/app/_models/ow-forecase.model';
import { OpenWeatherService } from 'src/app/_services/open-weather.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent {
  public pageTitle = 'City list';
  public forecastData$: Observable<IOwFireStoreCity[]> = of([]);
  displayedColumns: string[] = ['serial', 'location', 'date']

  constructor(private owService: OpenWeatherService) {
    this.forecastData$ = this.owService.fetchAll();
  }


}
