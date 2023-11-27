import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmpfehlungComponent } from '../empfehlung/empfehlung.component';
import { Artikel } from '../modules/Artikel';
import { ArtikelService } from '../Services/ArtikelService';

@Component({
  selector: 'app-artikel-full',
  templateUrl: './artikel-full.component.html',
  styleUrls: ['./artikel-full.component.css']
})
export class ArtikelFullComponent implements OnInit {
  artikel: Artikel;
  selectedImage: string;
  currentIndex: number = 0;
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  rightEnd:boolean = false;
  leftEnd:boolean = false;
  isLoading = true;
  selectedOption:number = 1;
  itemAdded:boolean = false;
  @ViewChild('childRef') childRef: EmpfehlungComponent;

  artikelSubscription: Subscription;
  paramSubscription: Subscription;


  constructor(private artikelService: ArtikelService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe(params => {
        this.isLoading = true;
        var categorie = params['categorieName'];
        this.artikelSubscription = this.artikelService.getArtikels(categorie).subscribe(erg => {
          this.artikel = erg[params['id']];
          this.selectedImage = this.artikel.images[0];
          setTimeout(() => {
            this.isLoading = false;
            if(this.childRef !== undefined) 
            {
              this.childRef.reload(categorie);
            }
          }, 300);
        })
      });
    }

  swipeLeft() {
    this.rightEnd = false;
    if (this.currentIndex <= 0){
      this.leftEnd = true;
      return;
    } 
    this.leftEnd = false;
    this.selectedImage = this.artikel.images[--this.currentIndex];
    if (this.currentIndex <= 0){
      this.leftEnd = true;
    } 
  }

  swipeRight() {
    this.leftEnd = false;
    if (this.currentIndex >= this.artikel.images.length -1) {
      this.rightEnd = true;
      return;
    }
    this.rightEnd = false;
    this.selectedImage = this.artikel.images[++this.currentIndex];
    if (this.currentIndex >= this.artikel.images.length -1) {
      this.rightEnd = true;
    }
  }

  back(){
    this.router.navigate(['../']);
  }

  addArtikel(artikel:Artikel){
    this.artikelService.addArtikelWarenkorb(artikel);
    console.log("adding" + artikel);
    this.itemAdded = true;
    setTimeout(() => {
      this.itemAdded = false;
    }, 2000);
  }

  updateMenge(){
      this.artikel.objectMenge = this.selectedOption;
  }

  formatPreis(preis: number){
    return this.artikelService.formatPreis(preis);
  }
}
