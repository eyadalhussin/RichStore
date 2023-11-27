import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavSubComponent } from './nav-sub/nav-sub.component';
import { KategorieComponent } from './kategorie/kategorie.component';
import { KategorieMenuComponent } from './kategorie-menu/kategorie-menu.component';
import { ArtikelComponent } from './artikel/artikel.component';
import { ArtikelFullComponent } from './artikel-full/artikel-full.component';
import { Routes, RouterModule } from '@angular/router';
import { EmpfehlungComponent } from './empfehlung/empfehlung.component';
import {HttpClientModule} from '@angular/common/http';
import { StarsComponent } from './small-components/stars/stars.component';
import { WarenkorbComponent } from './warenkorb/warenkorb.component';
import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { OrdersComponent } from './orders/orders.component';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar.component';
import { AccountComponent } from './account/account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SmallErrorComponent } from './small-components/small-error/small-error.component';
import { SmallSuccessComponent } from './small-components/small-success/small-success.component';

const appRoutes:Routes = [
  {path:"Home", component: HomeComponent},
  {path:"Categories/:categorieName", component:KategorieComponent},
  {path:"Categories/:categorieName/:id", component:ArtikelFullComponent},
  {path:"Cart", component: WarenkorbComponent},
  {path:"Checkout", component: CheckoutComponent},
  {path:"Orders", component: OrdersComponent},
  {path:"Account", component: AccountComponent},
  {path:"", component: HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NavSubComponent,
    KategorieComponent,
    KategorieMenuComponent,
    ArtikelComponent,
    ArtikelFullComponent,
    EmpfehlungComponent,
    StarsComponent,
    WarenkorbComponent,
    CheckoutComponent,
    LoadingSpinnerComponent,
    OrdersComponent,
    NavSidebarComponent,
    AccountComponent,
    SmallErrorComponent,
    SmallSuccessComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
