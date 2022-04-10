export interface IOwFireStoreCity {
  forecastData: IOwForecastResponse;
  date: number;
  location: string;
  id?: string;
}

export interface IOwForecastResponse {
  city: IOwForecastCity;
  cod: string;
  cnt: number;
  list: IOwForecastListItem[]
}

export interface IOwForecastListItem {
  clouds: { all: number };
  dt: number;
  dt_txt: string;
  main: IOwForecastListItemMain;
  pop: number;
  sys: {
    pod: string;
  }
  visibility: string;
  weather: IOwForecastListItemWeather[];
  wind: IOwForecastListItemWind;
}

export interface IOwForecastListItemMain {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
}

export interface IOwForecastListItemWeather {
  id: number;
  icon: string;
  description: string;
  main: string;
}

export interface IOwForecastListItemWind {
  deg: number;
  gust: number;
  speed: number;
}

export interface IOwForecastCity {
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}
