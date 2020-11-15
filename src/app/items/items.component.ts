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
    console.log("ngOnInit")
    this.getItems()
    //========
    this.acceptcoinsService.getItems().subscribe( item => this.dataSource.data = item);
    this.dataSource = new MatTableDataSource<Items>(this.ITEMS_DATA)
    // console.log("Data " +this.ITEMS_DATA)
    this.ref.detectChanges()
    

  }
  getItems():void{
    this.acceptcoinsService.getItems().subscribe((items) => (this.ITEMS_DATA = items))
  }

  selection = new SelectionModel<Items>(true, []);
  //  all items currently selected 
  allSelectedItems(): boolean{
    const selectedItems = this.selection.selected.length;
    this.items = this.selection.selected
    this.totalCost = this.getTotalCost();
  
    console.log("Selected:", this.selection.selected)
   // console.log("Cost    :", this.totalCost)
    const numberOfRows = this.dataSource.data.length;
  
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
      return `${this.selection.isSelected(row)? 'deselect': 'select'} row ${row.position + 1}`;
    }
  }
  // Total Cost of the Selected Items
  getTotalCost(): number{
    return this.items.map(t => t.price).reduce((acc, value) => acc + value, 0) 
  }
  // TODO : Logic for each item on click
  
  getTotalItems(): number{
    return this.stock
  }

}
