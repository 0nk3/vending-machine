import {FormControl, FormGroupDirective, FormGroup, NgForm, Validators} from '@angular/forms';
import { IProcessing } from './iprocessing';
import { Component, OnInit } from '@angular/core';
import { ItemsComponent } from '../items/items.component';
import { AcceptcoinsService } from '../acceptcoins.service';
export interface Coin{
  coin: number;
}
const items = new ItemsComponent();

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements IProcessing {

  originalCoin: Coin = {
    coin: 0
  };


  coinList: number[] = [1,2,5,10];
  disabler = true;

  // compute the total cost of the selected items
  getCoins():number{
    const total = this.coin.coin
    return total;
  }

  /* When buying an items, there are 3 possible things that might happen 
   * You have change(including unavailabilty of items)
   * You have no change
   * Money shortage
   */
  computeChange(): number {
    if(items.getTotalCost() > this.getCoins()){
      console.log("Insuficient")
      this.disabler = false;
      return this.getCoins() ; // insufficient funds
    }else if(items.getTotalCost()< this.getCoins()){
      console.log("There is chage")
      this.disabler = true
      return this.getCoins() - items.getTotalCost() ; // change
    }else{
      this.disabler = true;
      console.log("No Change")
      return 0; // no change
    }
  }

  insertCoin(coin : string): void {
    coin = coin.trim()
    console.log(coin)

  }
  dispenseItems(): void {
    throw new Error('Method not implemented.');
  }
  // retrieve coin inserted
  selectedCoins(): object{
    console.log("Available Balance : " + this.getCoins());
    return this.coin;
  }
  submitted = false;
  coin: Coin = {...this.originalCoin};
  constructor(private acceptService: AcceptcoinsService){}

  onInsert(form: NgForm) {
    this.submitted = true;
    console.log(" Input<from options> : " + JSON.stringify(this.coin))
    console.log('form valid ? : ', form.valid);
    this.acceptService.accept(this.coin).subscribe(
      (data) => console.log("Success", data),
      (error) => console.log("Error", error)
    );
  }
}