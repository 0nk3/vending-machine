export interface IProcessing{
    getNote():number;
    validateNote(note : number):boolean;
    insertion(): boolean;
    dispenseItems(): void;
}