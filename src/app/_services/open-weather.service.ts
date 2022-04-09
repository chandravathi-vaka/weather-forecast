import { IOwFireStoreCity, IOwForecastResponse } from './../_models/ow-forecase.model';
import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { HttpService } from "./http.service";
import { addDoc, collection, doc } from '@firebase/firestore';
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

  public addItem(searchString: string, forecastData: IOwForecastResponse) {
    this._showLoader = true;
    const owRef = collection(this.firestore, 'forecast-report');
    return addDoc(owRef, { date: new Date().toISOString(), location: searchString, forecastData } as IOwFireStoreCity).then(res => {
      this._showLoader = false;
      return res;
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
