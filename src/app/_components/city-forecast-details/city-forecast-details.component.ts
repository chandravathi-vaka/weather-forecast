import { IOwFireStoreCity } from './../../_models/ow-forecase.model';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenWeatherService } from 'src/app/_services/open-weather.service';

@Component({
  selector: 'app-city-forecast-details',
  templateUrl: './city-forecast-details.component.html',
  styleUrls: ['./city-forecast-details.component.scss']
})
export class CityForecastDetailsComponent implements OnInit {
  public pageTitle: string = `Weather Forecast of City`;
  public cityForecastData: IOwFireStoreCity | null = null;

  constructor(public router: ActivatedRoute, private owService: OpenWeatherService) { }
  displayedColumns: string[] = ['serial', 'date', 'humidity', 'temperature', 'weather']

  public get cityForecastId() { return this.router.snapshot.params['id']; }

  ngOnInit() {
    if (this.cityForecastId) {
      this.owService.fetchById(this.cityForecastId).subscribe((data: IOwFireStoreCity) => this.cityForecastData = data);
    }
  }

}
