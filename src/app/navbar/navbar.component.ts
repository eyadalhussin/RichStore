import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../modules/User';
import { ArtikelService } from '../Services/ArtikelService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  anzahlWarenkorb: number = 0;
  currentUser:User;
  isLoading:boolean = true;
  constructor(private router:Router, private artikelService: ArtikelService) { }

  ngOnInit(): void {
    this.artikelService.getUser().subscribe(erg => {
      this.currentUser = erg;
      this.isLoading = false;
    })
    this.updateWarenkrobCount();
  }

  onClickNavigate(){
    this.router.navigate(['Cart']);
  }

  onClickNavigateHome(){
    this.router.navigate(['Home']);
  }

  updateWarenkrobCount(){
    this.artikelService.updateWarenkorbCount();
    this.artikelService.anzahlWarenkorb.subscribe(erg => this.anzahlWarenkorb = erg);
  }

  openSideBar(){
    this.artikelService.sideBarActive.next(true);
  }

  onNavigate(link: string){
    this.router.navigate([link]);
  }

  formatPreis(preis: number){
    return this.artikelService.formatPreis(preis);
  }

}
