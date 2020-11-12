import { element } from 'protractor';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Trasaction } from './transactions';
import { Items } from './Item';
import { Coin } from '../options/options.component';
import { AcceptcoinsService } from '../acceptcoins.service';

// Definition of an item


const ITEMS_DATA: Items[] = [
  {position: 1, name: 'Jelly Beans', price: 3, remaining: 5},
  {position: 2, name: 'Coca Cola', price: 10, remaining: 5},
  {position: 3, name: 'Bar One', price: 8, remaining: 5},
  {position: 4, name: 'Fanta Orange', price: 10, remaining: 5},
  {position: 5, name: 'Nik Naks', price: 7, remaining: 5},
  {position: 6, name: 'Pop Shots', price: 4, remaining: 5},

];
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  totalCost = 0;
  coin: Coin;
  cartTotal = new Set();  
  items: Trasaction[];
  displayedColumns: string[] = [
    "select",
    "position",
    "name",
    "price",
    "remaining"
  ];
  constructor(private acceptcoinsService: AcceptcoinsService){}

  dataSource = new MatTableDataSource<Items>(ITEMS_DATA);
  selection = new SelectionModel<Items>(true, []);
  //  all items currently selected 
  allSelectedItems(): boolean{
    const selectedItems = this.selection.selected.length;
    this.items = this.selection.selected
    this.totalCost = this.getTotalCost();
    console.log("Selected:", this.selection.selected)
    console.log("Cost    :", this.totalCost)
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

  ngOnInit(): void {
  
  }
}
