import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Artikel } from '../modules/Artikel';
import { ArtikelService } from '../Services/ArtikelService';

@Component({
  selector: 'app-artikel',
  templateUrl: './artikel.component.html',
  styleUrls: ['./artikel.component.css']
})
export class ArtikelComponent implements OnInit {
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  @Input('artikel') artikel:Artikel;
  paramsSubscription:Subscription;
  
  constructor(
    private artikelService: ArtikelService, 
    private router: Router, 
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe( params => {
      this.artikelService.getArtikels(this.artikel.kategorie).subscribe( erg => {
        // this.artikel = erg[params['id']];
      });
    })
  }

  navigate(artikel:Artikel){
    // this.artikelService.setArtikel(artikel);
    // this.router.navigate(['./'], { relativeTo: this.route });
    // console.log('Navigating');
  }

  navigateToArtikel(id:number){
    this.router.navigate(["Categories/" + this.artikel.kategorie + "/" +id]);
  }

  formatPreis(preis : number){
    return this.artikelService.formatPreis(preis);
  }

}
