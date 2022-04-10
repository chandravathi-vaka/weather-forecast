import { IOwFireStoreCity, IOwForecastResponse } from './../_models/ow-forecase.model';
import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { HttpService } from "./http.service";
import { addDoc, collection, doc, query, limit, orderBy, getDocs } from '@firebase/firestore';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class OpenWeatherService {

  private _openWeatherKey = environment.openWeatherKey;
  private _showLoader = false;

  constructor(private httpService: HttpService, private firestore: Firestore) { }

  public get showLoader() { return this._showLoader; }

  public query(searchText: string) {
    this._showLoader = true;
    return this.httpService.httpGet<IOwForecastResponse>(`https://api.openweathermap.org/data/2.5/forecast?q=${searchText}&appid=${this._openWeatherKey}`).pipe(
      tap(() => this._showLoader = false)
    );
  }

  public async getRecentyAddedItem() {
    const owRef = collection(this.firestore, 'forecast-report');
    const lastCreatedItem = await getDocs(query(owRef, orderBy("date", 'desc'), limit(1)));
    return lastCreatedItem;
  }

  public addItem(searchString: string, forecastData: IOwForecastResponse) {
    this._showLoader = true;
    const owRef = collection(this.firestore, 'forecast-report');
    const cityData: IOwFireStoreCity = { date: new Date().getTime(), location: searchString, forecastData };
    return addDoc(owRef, cityData).then(() => {
      this._showLoader = false;
      return cityData;
    });
  }

  public fetchAll() {
    this._showLoader = true;
    const owRef = collection(this.firestore, 'forecast-report');
    return (collectionData(owRef, { idField: 'id' }) as Observable<IOwFireStoreCity[]>).pipe(
      tap(() => this._showLoader = false)
    );
  }

  public fetchById(id: string) {
    const owRef = doc(this.firestore, `forecast-report/${id}`);
    return (docData(owRef, { idField: 'id' }) as Observable<IOwFireStoreCity>).pipe(
      tap(() => this._showLoader = false)
    );
  }
}
