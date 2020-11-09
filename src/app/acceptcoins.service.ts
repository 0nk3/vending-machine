import { Coin } from './options/options.component';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AcceptcoinsService {
  URL = 'http://localhost:8080'
  constructor(private http: HttpClient) { }

  accept(coin : Coin){
    console.log("Data ===> " + JSON.stringify(coin))
    return this.http.post<any>(this.URL + '/accept', {
      coin
    });
  }
}
