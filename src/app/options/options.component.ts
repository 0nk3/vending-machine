
import { IProcessing } from './iprocessing';
import { Component, OnInit } from '@angular/core';
import { ItemsComponent } from '../items/items.component';
import { AcceptcoinsService } from '../acceptcoins.service';
export interface Coin{
  coin: number;
}


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent  {

  originalCoin: Coin = {
    coin: 0
  };
  constructor(private acceptService: AcceptcoinsService){}
 
  

  coinList: number[] = [1,2,5,10];
  disabler = true;

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
    throw new Error('Method not implemented.');
  }

  submitted = false;
  coin: Coin = {...this.originalCoin};

  onInsert(coin : Coin) {
    coin = coin
    if(!coin){
      return;
    }
    this.coin = coin;
    this.coinList.forEach(element => {
    if(element === this.coin.coin){
      this.submitted = true
      }
    });
    this.submitted = true;
    console.log(" Input<from options> : " + this.coin)

    this.acceptService.accept(coin as Coin).subscribe(
      (data) => console.log("Success", data),
      (error) => console.log("Error", error)
    );
  }
  ///try out behav
  // ngOnInit(): void {
  //   this.acceptService.currentCoin.subscribe( coin => this.coin = coin)
    
  // }
}