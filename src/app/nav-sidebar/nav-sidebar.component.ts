import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../modules/User';
import { ArtikelService } from '../Services/ArtikelService';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.css']
})
export class NavSidebarComponent implements OnInit {
  currentUser: User;
  sideBarActive:boolean = false;
  isLoading:boolean = true;
  constructor(private artikelService: ArtikelService, private router:Router) { }

  ngOnInit(): void {
    this.artikelService.sideBarActive.subscribe(erg => this.sideBarActive = erg);
    this.artikelService.getUser().subscribe(user => {
      this.currentUser = user;
      this.isLoading = false;
    });
  }

  closeSideBar(){
    this.artikelService.sideBarActive.next(false);
  }

  onNavigate(link: String){
    this.artikelService.sideBarActive.next(false);
    this.router.navigate([link]);
  }

  

}
