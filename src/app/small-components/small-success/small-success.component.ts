import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-small-success',
  templateUrl: './small-success.component.html',
  styleUrls: ['./small-success.component.css']
})
export class SmallSuccessComponent implements OnInit {
  @Input('text') text:string;
  constructor() { }

  ngOnInit(): void {
  }

}
