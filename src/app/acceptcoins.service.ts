import { Coin } from './options/options.component';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AcceptcoinsService {
  URL = 'http://localhost:8080';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) { }

  accept(coin : Coin): Observable<Coin>{
    console.log("Data ===> " + JSON.stringify(coin))
    return this.http.post<Coin>(this.URL + '/accept', coin, this.httpOptions).pipe(
      tap((newCoin: Coin)=> console.log(`inserted coin ${coin}`)),
      catchError(this.handleError<Coin>())
    )
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  coins: number[] = [];
  insert(coin: number) {
    this.coins.push(coin);
  }
  clear() {
    this.coins = [];
  }

}
