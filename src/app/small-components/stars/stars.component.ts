import { Component, Input, OnInit } from '@angular/core';
import { Artikel } from '../../modules/Artikel';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  @Input('artikel') artikel:Artikel;
  @Input('border') borderEnabled:boolean;
  @Input('size') size:string;
  StarsFull:Array<string> = [];
  StarsEmpty:Array<string> = [];

  constructor() { }

  ngOnInit(): void {
    if(this.artikel != undefined){
      this.fillStars();  
    }
  }

  fillStars(){
    for(var i = 0; i < this.artikel.bewertung; i++){
      this.StarsFull.push(" ");
    }
    for(var i = 0; i < 5 - this.artikel.bewertung; i++){
      this.StarsEmpty.push(" ");
    }
  }

}
