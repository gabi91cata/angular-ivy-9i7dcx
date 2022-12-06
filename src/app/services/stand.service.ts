import { Injectable } from '@angular/core';
import { Stand } from '../models/stand';
import { BackendService, Backend } from './backend.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class StandService extends BackendService<Stand> implements  Backend  {
  
  apiUrl = "stand" 

  constructor(private h : HttpClient) {
    super(h); 
  }
  
}
