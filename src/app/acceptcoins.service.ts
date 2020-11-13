import { ItemsService } from './items.service';
import { Items } from './items/Item';
import { Coin } from './options/options.component';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AcceptcoinsService {
  URL = 'http://localhost:8080';
  TOTAL = 0;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // try out behavior
  private coinSource = new BehaviorSubject({"coin": 0});
  currentCoin = this.coinSource.asObservable();
  changeMessage(coin: Coin) {
    this.coinSource.next(coin)
  }

  constructor(private http: HttpClient, private itemsService: ItemsService) { }
  // GET vendin machine items from the DB
  getItems(): Observable<Items[]>{
    return this.http.get<Items[]>(this.URL + '/items').pipe(
      tap((data) => console.log('items fetched ' + JSON.stringify(data))),
      catchError(this.handleError<Items[]>('get items', []))
    )
  }

  accept(coin : Coin): Observable<Coin>{
    this.coinSource.next(coin)
    this.TOTAL += +coin
  
    console.log("Vending Machine Total : " + this.TOTAL)
    console.log("Coin<from service> ===> " + JSON.stringify(coin))
    return this.http.post<Coin>(this.URL + '/accept', coin, this.httpOptions).pipe(
      tap((newCoin: Coin)=> console.log(`inserted coin ${coin}`)),
      catchError(this.handleError<Coin>())
    )
  }
  // addItem(item: Items): Observable<Items>{
  //   return this.http.post<Items>(this.URL + '/items', item, this.httpOptions).pipe(
  //     tap((newItem: Items) => this.log(newItem)),
  //     catchError(this.handleError<any>('add item'))
  //   );
  // }
  // TODO Reduce stock items after sale
  updateStock(item: Items):Observable<any>{
    return this.http.put<Items>(this.URL + '/update', this.httpOptions).pipe(
      tap((item) => item.remaining = item.remaining -1),
      catchError(this.handleError<any>('updateStock'))

    )
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
  private log(item: Items){
    this.itemsService.add(item)
  }

}
