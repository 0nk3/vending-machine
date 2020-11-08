import { element } from 'protractor';
import { IProcessing } from './iprocessing';
import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { ItemsComponent } from '../items/items.component';
export interface Note{
  value: number;
  viewValue: string;

}
const items = new ItemsComponent();

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})

export class OptionsComponent implements IProcessing {
  coins = new FormControl();
  coinList: number[] = [0,1,2,5];

  // compute the total cost of the selected items
  getCoins():number{
    
    let total = 0
    this.coins.value.forEach(coin => {
      total += coin;
    });
    console.log("get Coins : " + total)
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
      return this.getCoins() ; // insufficient funds
    }else if(items.getTotalCost()< this.getCoins()){
      console.log("There is chage")
      return this.getCoins() - items.getTotalCost() ; // change
    }else{
      console.log("No Change")
      return 0; // no change
    }
  }

  insertion(): boolean {
    throw new Error('Method not implemented.');
  }
  dispenseItems(): void {
    throw new Error('Method not implemented.');
  }
  // retrieve coins inserted
  selectedCoins(): object{
    console.log("Inserted : " + this.coins.value);
    return this.coins.value;
  }
}