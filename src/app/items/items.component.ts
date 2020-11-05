import { element } from 'protractor';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

// Definition of an item
export interface Items{
  position?: number;
  name?: string;
  price? : number;
  remaining?: number;
}
export interface Trasaction {
  name?: string;
  price? : number;
}

const ITEMS_DATA: Items[] = [
  {position: 0, name: 'Jelly Beans', price: 3, remaining: 5},
  {position: 1, name: 'Fizz Pop', price: 1, remaining: 5},
  {position: 2, name: 'Coke', price: 10, remaining: 5},
  {position: 3, name: 'Bar One', price: 8, remaining: 5},
  {position: 4, name: 'Fanta', price: 10, remaining: 5},
  {position: 5, name: 'Pop Shots', price: 7, remaining: 5},
  {position: 6, name: 'Nik Naks', price: 7, remaining: 5},
];
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  totalCost = 0;
  cartTotal = new Set();  
  balance: number;
  items: Trasaction[];
  displayedColumns: string[] = [
    "select",
    "position",
    "name",
    "price",
    "remaining"
  ];

  dataSource = new MatTableDataSource<Items>(ITEMS_DATA);
  selection = new SelectionModel<Items>(true, []);
  // are all items selected ?
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
