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
  public change = 0;
  inserted : Coin
  shareData = new Set();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }
  accept(coin : Coin): Observable<Coin>{
    this.inserted = coin;
    return this.http.post<Coin>(this.URL + '/accept', coin, this.httpOptions).pipe(
      tap((_)=> this.inserted = coin),
      catchError(this.handleError<Coin>())
    )
  }

  // GET items data 
  getItems(): Observable<Items[]>{
    return this.http.get<Items[]>(this.URL + '/items').pipe(
      tap((d) => console.log("Data  Received : \n" + JSON.stringify(d))),
      catchError(this.handleError<Items[]>('get items', []))
    )
  }

  updateStock(position: number):Observable<Items>{
    return this.http.put<Items>(`${this.URL}/update?position=${position}`, this.httpOptions).pipe(
      tap((_) => console.log("items sold and updated . . . ")),
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
    // GET veding machine item by position and compute change. Will 404 if position is not found 
    getItem(position: number): Observable<Items> {
      const url = `${this.URL}/${position}`;
      return this.http.get<Items>(url).pipe(
        tap((item) => {
          this.inserted.coin < item.Price ? this.change = this.inserted.coin : this.change = this.inserted.coin - item.Price,
          console.log("Change : " ,this.change)
        }),
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
