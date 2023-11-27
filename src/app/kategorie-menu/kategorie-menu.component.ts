import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artikel } from '../modules/Artikel';
import { ArtikelService } from '../Services/ArtikelService';

@Component({
  selector: 'app-kategorie-menu',
  templateUrl: './kategorie-menu.component.html',
  styleUrls: ['./kategorie-menu.component.css']
})
export class KategorieMenuComponent implements OnInit {
  @Input('categorieName') categorieName: string;
  artikels: Array<Artikel> = [];
  id: number = 0;
  constructor(private artikelService: ArtikelService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.getArtikels();
  };

  getArtikels() {
    this.artikelService.getArtikels(this.categorieName).subscribe( erg => {
      this.artikels = erg;
    })
  }

  navigateToArtikel(artikel) {
    this.router.navigate(["Categories/"+artikel.kategorie + "/" + +artikel.id]);
  }

  navigateToCategorie(categorieName){
    this.router.navigate(["Categories/"+categorieName]);
  }

  formatPreis(preis : number){
    return this.artikelService.formatPreis(preis);
  }
}
