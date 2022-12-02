import { Component, OnInit } from '@angular/core';
import { AddComponent } from './add/add.component';
export const standsRoutes = [
  {path: 'add', component: AddComponent },

]
@Component({
  selector: 'app-stands',
  templateUrl: './stands.component.html',
  styleUrls: ['./stands.component.css']
})
export class StandsComponent implements OnInit {
  loaded = false;
  list = []
  constructor() {
   
  }
  ngOnInit(): void {
    this.list.push({
      name: 'Test',
      number: 64,
      type: '6x6',
      created_at:  new Date()
    });
   
      this.loaded = true;
    
  }
}
