import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { settingsRoutes, SettingsComponent } from './settings/settings.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DeviceComponent } from './settings/device/device.component';
import { UsersComponent } from './settings/users/users.component';
import { CalibrationComponent } from './settings/calibration/calibration.component';
import { GeneralComponent } from './settings/general/general.component';
import { StandsComponent } from './settings/stands/stands.component';
import { AddComponent } from './settings/stands/add/add.component';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    QRCodeModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '',   redirectTo: 'home', pathMatch: 'full' }, // 
      { path: 'home/323', component: HomeComponent },
      { path: 'home/323/333', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { 
        path: 'settings', 
        component: SettingsComponent, 
        children: settingsRoutes,
     },
    ])
   ],
  declarations: [ AppComponent, HelloComponent, SettingsComponent, HomeComponent, DeviceComponent, UsersComponent, CalibrationComponent, GeneralComponent, StandsComponent, AddComponent  ],
  bootstrap:    [ AppComponent,  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
