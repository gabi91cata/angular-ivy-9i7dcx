import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  constructor(private titleService:Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Setari generale')
  }
}
