import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artikel } from '../modules/Artikel';
import { ArtikelService } from '../Services/ArtikelService';

@Component({
  selector: 'app-kategorie',
  templateUrl: './kategorie.component.html',
  styleUrls: ['./kategorie.component.css']
})
export class KategorieComponent implements OnInit {
  categorieName: string;
  isLoading:boolean = true;
  artikels: Artikel[];
  
  constructor(private artikelService: ArtikelService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    // this.categorieName = this.route.snapshot.params['categorieName'];
    this.route.paramMap.subscribe(params => {
      this.isLoading = true;
      this.categorieName = params.get('categorieName');
      this.artikelService.getArtikels(this.categorieName).subscribe(artikels => {
        this.artikels = artikels;
        setTimeout(() => {
          this.isLoading = false;
        }, 300);
      });
    })
  }
}

