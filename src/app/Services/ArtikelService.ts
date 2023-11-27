import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TmplAstBoundAttribute } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subject } from "rxjs";
import { Artikel } from "../modules/Artikel";
import { User } from "../modules/User";

@Injectable({ providedIn: 'root' })
export class ArtikelService {
    selectedArtikel: Artikel;
    anzahlWarenkorb = new Subject<number>();
    currentUser = new Subject<User>();
    sideBarActive = new Subject<boolean>();

    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient) {
        // this.addUser();
        this.getUser();
    }

    getArtikels(kategorieName: string) {
        return this.http.get<Artikel[]>("assets/data/" + kategorieName + ".json");
    }

    getSelectedArtikel() {
        return this.selectedArtikel;
    }

    setArtikel(artikel: Artikel) {
        this.selectedArtikel = artikel;
    }

    getWarenkorbArtikel() {
        return this.http.get("https://ng-richshop-default-rtdb.firebaseio.com/user1/warenkorb.json");
    }

    addArtikelWarenkorb(artikel: Artikel) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<Artikel>("https://ng-richshop-default-rtdb.firebaseio.com/user1/warenkorb.json", artikel, { headers: headers }).subscribe(erg => this.updateWarenkorbCount());
    }

    deleteArtikel(objectName: string) {
        console.log("deleting Object : " + objectName);
        return this.http.delete("https://ng-richshop-default-rtdb.firebaseio.com/user1/warenkorb/" + objectName + ".json");
    }

    updateWarenkorbCount() {
        this.getWarenkorbArtikel().subscribe(erg => {
            var anzahl = 0;
            for (let element in erg) {
                anzahl++;
            }
            this.anzahlWarenkorb.next(anzahl);
        });
    }

    formatPreis(preis: number) {
        if (preis === undefined) return 0;
        return preis.toLocaleString(undefined, { minimumFractionDigits: 0 });
    }

    addUser() {
        var user1 = new User("1", "Max", "Muster", 999999999, "Musterstraße.18", "Musterstadt 55555", "Nordrhein-Westfalen", "max@muster.de", "123456");
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.http.post<User>("https://ng-richshop-default-rtdb.firebaseio.com/user1/info.json", user1, { headers: headers }).subscribe(erg => console.log(erg));
    }

    getUser() {
        return this.http.get<User>("https://ng-richshop-default-rtdb.firebaseio.com/user1/info.json");
    }

    updateUser(updatedUser: User) {
        return this.http.put<User>("https://ng-richshop-default-rtdb.firebaseio.com/user1/info.json", updatedUser, { headers: this.headers });
    }

    confirmPurchase(artikels: Artikel[]) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.http.post<Artikel[]>("https://ng-richshop-default-rtdb.firebaseio.com/user1/orders.json", artikels, { headers: headers }).subscribe(erg => {
            this.http.delete("https://ng-richshop-default-rtdb.firebaseio.com/user1/warenkorb.json").subscribe(erg => { });
        });
    }

    getOrders() {
        return this.http.get<Artikel[]>("https://ng-richshop-default-rtdb.firebaseio.com/user1/orders.json");
    }
}