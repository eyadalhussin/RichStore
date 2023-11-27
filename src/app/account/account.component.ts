import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { User } from '../modules/User';
import { ArtikelService } from '../Services/ArtikelService';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  animations: [
    trigger('dropDown', [
      state('open', style({
        'height': '*',
        'padding': '8px'
      })),
      state('closed', style({
        'height': '0',
        'padding': '0',
        'border': 'none'
      })),
      transition('open <=> closed', animate(300)),
    ])
  ]
})

export class AccountComponent implements OnInit {
  emailState: string = 'closed';
  currentUser: User;
  isLoading: boolean = true;
  emailChanged: string = '';
  passwordChanged: string = '';
  passwordError:string = '';
  passwordVisible:boolean;
  addressChanged = '';
  states = {
    'email': 'closed',
    'password': 'closed',
    'address': 'closed'
  }
  constructor(private artikelService: ArtikelService) { }

  ngOnInit(): void {
    this.artikelService.getUser().subscribe(erg => {
      this.currentUser = erg;
      this.isLoading = false;
    });
  }

  triggerEdit(name: string) {
    for (let element in this.states) {
      if (element !== name) this.states[element] = 'closed';
    }
    this.emailChanged = '';
    this.states[name] == 'open' ? this.states[name] = 'closed' : this.states[name] = 'open';
  }

  changeEmail(emailInput: HTMLInputElement, emailConfirm: HTMLInputElement) {
    if (emailInput.value !== emailConfirm.value) {
      this.emailChanged = 'error';
      return;
    }
    this.currentUser.email = emailInput.value;

    this.artikelService.updateUser(this.currentUser).subscribe(erg => {
      this.currentUser = erg
      this.emailChanged = 'changed';
      emailInput.value = '';
      emailConfirm.value = '';
      setTimeout(() => {
        this.states['email'] = 'closed';
        this.emailChanged = '';
      }, 2000);
    }
    );
  }

  changePassword(currentPassword: HTMLInputElement, passwordInput: HTMLInputElement, passwordConfirm: HTMLInputElement) {
     if (currentPassword.value !== this.currentUser.password) {
      this.passwordChanged = 'error';
      this.passwordError = 'Error: you have given a wrong password !'
      return;
    }
    else if (passwordInput.value !== passwordConfirm.value) {
      this.passwordChanged = 'error';
      this.passwordError = 'Error: passwords are not matching !'
      return;
    }
    this.currentUser.password = passwordInput.value;

    this.artikelService.updateUser(this.currentUser).subscribe(erg => {
      this.currentUser = erg
      this.passwordChanged = 'changed';
      passwordInput.value = '';
      currentPassword.value = '';
      passwordConfirm.value = '';
      setTimeout(() => {
        this.states['password'] = 'closed';
        this.passwordChanged = '';
      }, 2000);
    }
    );
  }

  changeAddress(street: HTMLInputElement, city: HTMLInputElement, land: HTMLInputElement) {
  if(street.value == '' || city.value == '' ||land.value == ''){
    this.addressChanged = 'error';
    return;
  }
    this.currentUser.strasse = street.value;
    this.currentUser.stadt = city.value;
    this.currentUser.land = land.value;
   this.artikelService.updateUser(this.currentUser).subscribe(erg => {
     this.currentUser = erg
     street.value = land.value = city.value = '';
     this.addressChanged = 'changed';
     setTimeout(() => {
       this.states['address'] = 'closed';
       this.addressChanged = '';
     }, 2000);
   }
   );
 }

  togglePassword(){
    this.passwordVisible = !this.passwordVisible;
  }

  closeEdits(){
    for(let element in this.states){
      this.states[element] = 'closed';
    }
  }
}
