import { Items } from './items/Item';
import { Coin } from './options/options.component';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcceptcoinsService {
  URL = 'http://localhost:8080';
  TOTAL = 0;
  public inserted: number;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }
  

  accept(coin : Coin): Observable<Coin>{
    console.log("Coin : " + JSON.stringify(coin))
    this.inserted = coin.coin
    return this.http.post<Coin>(this.URL + '/accept', coin, this.httpOptions).pipe(
      tap((newCoin: Coin)=> console.log(`inserted coin ${coin}`)),
      catchError(this.handleError<Coin>())
    )
  }
  // GET items data from the server 
  getItems(): Observable<Items[]>{
    return this.http.get<Items[]>(this.URL + '/items').pipe(
      tap((d) => console.log("Data  Received : \n" + JSON.stringify(d))),
      catchError(this.handleError<Items[]>('get items', []))
    )
  }
  // TODO Reduce stock items after sale
  updateStock(position: number):Observable<Items>{
    return this.http.put<Items>(`${this.URL}/update?position=${position}`, this.httpOptions).pipe(
      tap((_) => console.log("items sold and updaated")),
      catchError(this.handleError<any>('updateStock'))
    );
  }
    // GET vending machine item by position. Return `undefined` when position is not found 
    getHeroNo404(position: number): Observable<Items> {
      const url = `${this.URL}/?position=${position}`;
      return this.http.get<Items[]>(url).pipe(
        map((items) => items[0]), // returns a {0|1} element array
        tap((h) => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} item position=${position}`);
        }),
        catchError(this.handleError<Items>(`getItem position=${position}`))
      );
    }
    // GET veding machine item by position. Will 404 if position is not found 
    getItem(position: number): Observable<Items> {
      const url = `${this.URL}/${position}`;
      return this.http.get<Items>(url).pipe(
        tap((_) => console.log(`fetched item position=${position}`)),
        catchError(this.handleError<Items>(`getItem position=${position}`))
      );
    }
   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation' ,result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
