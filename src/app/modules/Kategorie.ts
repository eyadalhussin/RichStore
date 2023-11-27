import { Artikel } from "./Artikel";

export class Kategorie{
    constructor(public name:string,
        public listArtikel: Artikel[]){
    }
}