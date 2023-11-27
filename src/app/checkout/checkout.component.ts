import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Artikel } from '../modules/Artikel';
import { User } from '../modules/User';
import { ArtikelService } from '../Services/ArtikelService';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  artikels:Artikel[] = [];
  summe: number = 0;
  currentUser:User;
  pruchased:string = "none";
  redirectCounter:number = 5;
  isLoading:boolean = true;

  constructor(private artikelService: ArtikelService, private router:Router) { }

  ngOnInit(): void {
    this.getArtikels();
    this.artikelService.getUser().subscribe(erg => {
      this.currentUser = erg;
      this.isLoading = false;
      });
    }

  getArtikels(){
    this.artikelService.getWarenkorbArtikel().subscribe(erg => {
      for(let element in erg){
        this.artikels.push(erg[element]);
      }
      this.artikels.forEach(artikel => {
        this.summe += artikel.preis;
      })
    })
  }

  formatPreis(preis:number){
    return this.artikelService.formatPreis(preis);
  }

  onNavigate(link : string){
    this.router.navigate([link]);
  }

  confirmPurchase(){
    if(this.currentUser.saldo < this.summe){
      this.pruchased = 'error';
      return;
    } else if(this.currentUser.saldo >= this.summe){
      this.pruchased = 'success';
      this.currentUser.saldo -= this.summe;
      this.artikelService.confirmPurchase(this.artikels);
      this.artikelService.updateUser(this.currentUser).subscribe(erg => {
        this.currentUser = erg;
      });
      this.artikelService.currentUser.next(this.currentUser);
      this.artikelService.anzahlWarenkorb.next(0);
      this.redirect();
    } else return;
  }

  redirect(){
    setInterval(() => {
      this.redirectCounter--;
      if(this.redirectCounter == 0) this.router.navigate(['Orders']);
    } , 1000);
  }



}
