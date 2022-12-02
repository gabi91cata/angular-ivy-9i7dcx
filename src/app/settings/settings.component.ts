import { Component, OnInit } from '@angular/core';
import { DeviceComponent } from './device/device.component'; 
import { UsersComponent } from './users/users.component';
import { CalibrationComponent } from './calibration/calibration.component';
import { GeneralComponent } from './general/general.component';
import { StandsComponent, standsRoutes } from './stands/stands.component';
import { Router, ActivatedRoute } from '@angular/router';

export const settingsRoutes = [
  {path: 'device', component: DeviceComponent}, 
  {path: 'users', component: UsersComponent },
  {path: 'calibration', component: CalibrationComponent },
  {path: 'general', component: GeneralComponent },
  {path: 'stands', component: StandsComponent,
    children: standsRoutes
  },
]

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute 
    ){
    
  }

  ngOnInit(): void { 
    if(this.route.children.length == 0)
      this.router.navigate(['general'], { relativeTo: this.route });
  } 
}
