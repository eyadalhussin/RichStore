export class Artikel{
    constructor(
        public id:number,
        public name:string,
        public images:string[],
        public preis:number,
        public beschreibung:string,
        public bewertung:number,
        public kategorie:string,
        public objectName:string,
        public objectMenge: number
    ){ }
}