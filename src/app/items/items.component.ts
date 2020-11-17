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
  
  change = 0
  totalCost = 0;
  coin: Coin; 
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

    // Retrive Data From the server
  ngOnInit(): void {
    this.acceptcoinsService.getItems().subscribe(item => {
      this.dataSource.data = item
    })
  }

    // all items currently selected 
  selection = new SelectionModel<Items>(true, []);
  allSelectedItems(): boolean{
    const selectedItems = this.selection.selected.length;
    console.log("Selected : ", this.selection.selected)
    const numberOfRows = this.dataSource.data.length;

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
  // Compute change
  checkOut(): number{
    this.selection.selected.map(p => {
      if(p.Price > this.coin.coin){
        this.change = this.coin.coin 
        console.log("Change : " + this.change) // insufficient funds, return money back
      }else{
        this.acceptcoinsService.updateStock(p.Position)
        this.change =  this.coin.coin - p.Price
        console.log("Change : " + this.change)
      }
    })
    return this.change;
  }
  isSomethingSelected(){
    return this.selection.selected.length>0
  }
}
