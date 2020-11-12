import { Items } from './items/Item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  item: Items[] = []

  add(item: Items){
    this.item.push(item)
  }
  clear(){
    this.item = []
  }
}
