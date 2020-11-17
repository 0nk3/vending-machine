import { ItemsComponent } from './../items/items.component';

import { Component, OnInit } from '@angular/core';
import { AcceptcoinsService } from '../acceptcoins.service';

export interface Coin{
  coin: number;
}
@Component({
  providers: [ItemsComponent],
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit{

  originalCoin: Coin = {
    coin: 0
  };
  constructor(private acceptService: AcceptcoinsService, private itemsComp: ItemsComponent ){}
 
  coinList: number[] = [1,2,5,10];

  // compute the total cost of the selected items
  getCoins(coin : Coin):number{
    this.coin = coin;
    console.log("From getCoins " + this.coin)
    return this.coin.coin
  }
  /* When buying an items, there are 3 possible things that might happen 
   * You have change(including unavailabilty of items)
   * You have no change
   * Money shortage
   */
  dispenseItems(): void {
    this.itemsComp.checkOut();
  }

  submitted = false;
  coin: Coin = {...this.originalCoin};

  onInsert(coin : Coin) {
    this.coin = coin
    if(!coin){
      return;
    }
    this.coin = coin;
    if(this.coin.coin in this.coinList){
      this.submitted = true
    }
    console.log(" Input<from options> : " + this.coin)

    this.acceptService.accept(this.coin).subscribe(
      (data) => console.log("Success", data),
      (error) => console.log("Error", error)
    );
    this
  }
  ngOnInit(): void {} 
}