import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Artikel } from '../modules/Artikel';
import { ArtikelService } from '../Services/ArtikelService';

@Component({
  selector: 'app-empfehlung',
  templateUrl: './empfehlung.component.html',
  styleUrls: ['./empfehlung.component.css']
})
export class EmpfehlungComponent implements OnInit {
  artikels:Artikel[];
  @Input('selectedID') selectedID:string;
  isLoading:boolean = true;
  @Input('categorie') categorie:string;

  constructor(private artikelService:ArtikelService, private http:HttpClient) { }

  ngOnInit(): void {
    this.reload(this.categorie);
  }

  reload(categorie:string){
    this.isLoading = true;
    this.artikelService.getArtikels(categorie).subscribe(
      erg => {
        this.artikels = erg.filter((value, index) => +this.selectedID !== index);
          this.isLoading = false;
      }
      );
  };

}
