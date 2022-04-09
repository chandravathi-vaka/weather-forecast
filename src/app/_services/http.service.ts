import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  public httpGet<T>(url: string, options: {} = {}): Observable<T> {
    return this.httpClient.get<T>(url, options).pipe(
      catchError(err => {
        console.log(err.error.cod === '404' ? err.error.message : 'Unable to Process request');
        return throwError(err);
      })
    );
  }
}
