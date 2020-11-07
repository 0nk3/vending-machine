import { IProcessing } from './iprocessing';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements IProcessing {

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
}
