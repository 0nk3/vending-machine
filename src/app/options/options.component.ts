import { IProcessing } from './iprocessing';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
export interface Note{
  value: number;
  viewValue: string;

}
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements IProcessing, OnInit {
  selectedNote : number;
  selectedNoteModel: string;
   notes: Note[] = [
     { value: 0, viewValue: "0 cents"},
     { value: 1, viewValue: "R1"},
     { value: 2, viewValue: "R2"},
     { value: 5, viewValue: "R5"}
   ];


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
  ngOnInit(){
    this.selectedNote = this.notes[0].value;
    this.selectedNoteModel = this.notes[0].viewValue;
  }
}
