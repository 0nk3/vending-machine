import { IProcessing } from './iprocessing';
import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
export interface Note{
  value: number;
  viewValue: string;

}
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements IProcessing {
  coins = new FormControl();
  coinList: number[] = [0,1,2,5];

  getNote(): number {
    throw new Error('Method not implemented.');
  }
  validateNote(note: number): boolean {
    throw new Error('Method not implemented.');
  }
  insertion(): boolean {
    throw new Error('Method not implemented.');
  }
  dispenseItems(): void {
    throw new Error('Method not implemented.');
  }
  onCoinSelection(): object{
    // console.log("Inserted : " + this.coins.value);
    return this.coins.value;
  }
}