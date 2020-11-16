import { element } from 'protractor';

import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from './transactions';
import { Items } from './Item';
import {ChangeDetectorRef} from '@angular/core'
import { Coin } from '../options/options.component';
import { AcceptcoinsService } from '../acceptcoins.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  
  stock = 0;
  totalCost = 0;
  coin: Coin;
  cartTotal = new Set();  
  items: Transaction[];
  ITEMS_DATA: Items[]
  displayedColumns: string[] = [
    "select",
    "position",
    "name",
    "price",
    "remaining"
  ];
  dataSource: MatTableDataSource<Items>;

  constructor(private ref : ChangeDetectorRef, private acceptcoinsService: AcceptcoinsService){ }

  ngOnInit(): void {
    this.acceptcoinsService.getItems().subscribe( item => this.dataSource.data = item);
    this.dataSource = new MatTableDataSource<Items>(this.ITEMS_DATA)
    this.ref.detectChanges()
  }

    //  all items currently selected 
  selection = new SelectionModel<Items>(true, []);
  allSelectedItems(): boolean{
    const selectedItems = this.selection.selected.length;
    this.items = this.selection.selected
    this.getTotalCost();
    console.log("Selected : ", this.selection.selected)
   // console.log("Cost    :", this.totalCost)
    const numberOfRows = this.dataSource.data.length;
    // this.getTotalItems(this.selection.selected.price)
  
    return selectedItems === numberOfRows;
  }

  // Select all rows if they are not all selected; otherwise
  masterToggle(){
    this.allSelectedItems()?
    this.selection.clear(): this.dataSource.data.forEach(
      row => this.selection.select(row));
  }

  // Label for the checkbox on the passed row
  checkboxLabel(row?: Items): string{
    if(!row){
      return `${this.allSelectedItems()? 'select': 'deselect'} all`;
    }else{
      // console.log("row.position +1 :" + row)
      return `${this.selection.isSelected(row)? 'deselect': 'select'} row ${row.position + 1}`;
    }
  }
  // Total Cost of the Selected Items
  getTotalCost():void {
    this.items.forEach( (t)=> {
      console.log(t.Price)
      this.totalCost += t.Price;
      console.log(t)
    })
  
  }
  getTotalItems(pos: number): void{
    this.acceptcoinsService.updateStock(pos)
  }

}
