import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import * as Highcharts from 'highcharts';

import { IOwFireStoreCity, IOwForecastResponse, IOwForecastListItem } from './../../_models/ow-forecase.model';
import { OpenWeatherService } from 'src/app/_services/open-weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public pageTitle = 'Search by city name';
  public form: FormGroup = new FormGroup({
    searchText: new FormControl('')
  });
  public Highcharts: typeof Highcharts = Highcharts;
  public humidityChartOptions: any = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Weather Humidity Chart'
    },
    xAxis: {
      categories: [],
      title: {
        text: 'Locations',
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Humidity',
      }
    },
    series: [],
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      shadow: true
    }
  };

  public temperatureChartOptions: any = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Weather Temperature Chart'
    },
    xAxis: {
      categories: [],
      title: {
        text: 'Locations',
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Temperature',
      }
    },
    series: [],
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      shadow: true
    }
  };

  constructor(private owService: OpenWeatherService) { }

  public get searchTextVal() { return this.form.value.searchText ? this.form.value.searchText.trim() : ''; }

  handleFormSubmit() {
    if (this.searchTextVal) {
      console.log('Searched City', this.form.value.searchText);
      this.owService.query(this.form.value.searchText).subscribe((data: IOwForecastResponse) => {
        if (data) {
          this.owService.addItem(this.searchTextVal, data).then((res: IOwFireStoreCity) => {
            console.log('Location added to the list');
            this.humidityChartOptions = this.getUpdatedChartOptions(this.humidityChartOptions, res, 'humidity');
            this.temperatureChartOptions = this.getUpdatedChartOptions(this.temperatureChartOptions, res, 'temp');
            this.form.reset();
          }).catch(() => console.log('failed to add data to the list'));
        } else {
          console.log('Searched Record data not existed')
        }
      });
    }
  }

  getUpdatedChartOptions(chartOptions: any, res: IOwFireStoreCity, prop: 'temp' | 'humidity') {
    const newChartOptions = { ...chartOptions };
    newChartOptions.xAxis.categories.push(res.location);
    const forecaseByDateMap = new Map<string, number>();
    // get max temp/humidity number from the list
    res.forecastData.list.forEach(listItem => {
      const dte = listItem.dt_txt.split(' ')[0];
      const existingValue = forecaseByDateMap.get(dte);
      const newValue = listItem.main[prop];
      forecaseByDateMap.set(dte, existingValue ? (existingValue > newValue ? existingValue : newValue) : newValue)
    });
    //apend value to the chart options
    forecaseByDateMap.forEach((value: number, key: string) => {
      const foundChartSeries = newChartOptions.series.find((cItem: any) => cItem.name === key);
      if (foundChartSeries) {
        foundChartSeries.data.push(value);
      } else if (!foundChartSeries) {
        newChartOptions.series.push({ name: key, data: [value] });
      }
    });
    return newChartOptions;
  }

}
