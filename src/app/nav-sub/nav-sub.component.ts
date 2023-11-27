import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artikel } from '../modules/Artikel';
import { ArtikelService } from '../Services/ArtikelService';

@Component({
  selector: 'app-nav-sub',
  templateUrl: './nav-sub.component.html',
  styleUrls: ['./nav-sub.component.css']
})
export class NavSubComponent implements OnInit {

  constructor(private router:Router, private artikelSerivce:ArtikelService) { }

  ngOnInit(): void {
  }

  navigate(categorieName:string){
    this.router.navigate(["Categories/"+categorieName]);
  }

}
