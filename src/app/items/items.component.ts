import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from './transactions';
import { Items } from './Item';
import { Coin } from '../options/options.component';
import { AcceptcoinsService } from '../acceptcoins.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  
  totalCost = 0;
  coin: Coin; 

  cart = new Set();
  items: Transaction[];
  ITEMS_DATA: Items[]
  dataSource  = new MatTableDataSource();
  displayedColumns: string[] = [
    "select",
    "position",
    "name",
    "price",
    "remaining"
  ];
 
  constructor(
    private acceptcoinsService: AcceptcoinsService  )
    { }

    // Retrive Data
  ngOnInit(): void {
    this.acceptcoinsService.getItems().subscribe(item => {
      this.dataSource.data = item
    })
  }

    // all items currently selected 
  selection = new SelectionModel<Items>(true, []);
  allSelectedItems(): boolean{
    const selectedItems = this.selection.selected.length;
    //I wanna keep track of items selected(state)
    for (let item of this.selection.selected) {
      this.cart.add(item)
    }
    // this.cart = this.selection.selected
    // console.log("Zeroth element : " + this.selection.selected[0].Position)
    const numberOfRows = this.dataSource.data.length;
    console.log("Selected : ", this.cart)
    // console.log("Selected Items via personal Set : " +  this.cart)
    return selectedItems === numberOfRows;
  }

  

  //Select all rows if they are not all selected; otherwise
  masterToggle(row? : any){
    this.allSelectedItems()?
    this.selection.clear(): this.dataSource.data.forEach(() => this.selection.select())
  }

  // Label for the checkbox on the passed row
  checkboxLabel(row?: Items): string{
    if(!row){
      return `${this.allSelectedItems()? 'select': 'deselect'} all`;
    }else{
      return `${this.selection.isSelected(row)? 'deselect': 'select'} row ${row.Position + 1}`;
    }
  }
  // Total Cost of the Selected Items
  getTotalCost():number {
    return this.items.map( t => t.Price).reduce((total, price) => total + price, 0)
  }

  checkOut() {
    console.log("Size of the cart : =========================> " + this.cart.size)
    this.acceptcoinsService.getItem(this.cart[0].Position)
    // this.acceptcoinsService.updateStock(this.cart[0].Position) 
  }
}
