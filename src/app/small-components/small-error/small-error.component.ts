import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-small-error',
  templateUrl: './small-error.component.html',
  styleUrls: ['./small-error.component.css']
})
export class SmallErrorComponent implements OnInit {
  @Input('text') text:string;
  constructor() { }

  ngOnInit(): void {
  }

}
