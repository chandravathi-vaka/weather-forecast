import { Observable, of } from 'rxjs';
import { IOwForecastCity, IOwForecastResponse, IOwFireStoreCity } from './../../_models/ow-forecase.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { OpenWeatherService } from 'src/app/_services/open-weather.service';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    searchText: new FormControl('')
  });

  public forecastData$: Observable<IOwFireStoreCity[]> = of([]);

  constructor(private owService: OpenWeatherService) { }

  ngOnInit(): void {
    this.forecastData$ = this.owService.fetchAll();
  }

  public get searchTextVal() { return this.form.value.searchText ? this.form.value.searchText.trim() : ''; }

  handleFormSubmit() {
    if (this.searchTextVal) {
      console.log('Searched City', this.form.value.searchText);
      this.owService.query(this.form.value.searchText).subscribe((data: IOwForecastResponse) => {
        if (data) {
          this.owService.addItem(this.searchTextVal, data).then(() => {
            console.log('Location added to the list');
            this.form.reset();
          }).catch(() => console.log('failed to add data to the list'));
        } else {
          console.log('Searched Record data not existed')
        }
      });
    }
  }

}
