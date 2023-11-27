export class User{
    constructor(
        public id:string,
        public vorname:string,
        public nachname:string,
        public saldo:number,
        public strasse:string,
        public stadt:string,
        public land:string,
        public email:string,
        public password:string
        ){}
}