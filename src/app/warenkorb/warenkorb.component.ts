import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Artikel } from '../modules/Artikel';
import { ArtikelService } from '../Services/ArtikelService';

@Component({
  selector: 'app-warenkorb',
  templateUrl: './warenkorb.component.html',
  styleUrls: ['./warenkorb.component.css']
})
export class WarenkorbComponent implements OnInit {
    artikelListe = [];
    values:string[] = [];
    warenkorbSubscription: Subscription;
    numbers:number[]  = [1,2,3,4,5,6,7,8,9];
    summe:number;

  constructor(private artikelService:ArtikelService, private router: Router) { }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(){
    this.artikelListe = [];
    this.values = [];
    this.warenkorbSubscription = this.artikelService.getWarenkorbArtikel().subscribe(erg => {
      for(let value in erg){
        this.values.push(value);
      }
      for(var i = 0; i < this.values.length; i++){
        this.artikelListe.push(erg[this.values[i]]);
      }
      for(var i = 0; i < this.values.length; i++){
        this.artikelListe[i].objectName = this.values[i];
        console.log("Object Name is:" + this.artikelListe[i].objectName);
      }
      this.summe = this.calcSum();
      console.log(this.artikelListe);
    })
  }

  onUpdateMenge(artikel: Artikel){
    console.log("updated");
  }

  calcSum(): number{
    var erg = 0;
    for(let element of this.artikelListe){
      erg += element.preis;
    }
    return erg;
  }

  onRemoveItem(objectName:string){
    console.log("deleting" + objectName);
    this.artikelService.deleteArtikel(objectName).subscribe(erg => {
      this.artikelService.updateWarenkorbCount();
      this.fetchItems();
    })
  }

  onNavigateCheckout(){
    this.router.navigate(['Checkout']);
  }

  formatPreis(preis: number){
    return this.artikelService.formatPreis(preis);
  }

}
