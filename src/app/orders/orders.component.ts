import { Component, OnInit } from '@angular/core';
import { Artikel } from '../modules/Artikel';
import { ArtikelService } from '../Services/ArtikelService';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders:Artikel[] = [];
  isLoading:boolean = true;
  constructor(private artikelService: ArtikelService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.artikelService.getOrders().subscribe(erg => {
      for(let element in erg){
        for(let order in erg[element]){
          this.orders.push(erg[element][order]);
        }
      }
      this.isLoading = false;
    });
  }

  formatPreis(preis:number){
    return this.artikelService.formatPreis(preis);
  }
}
