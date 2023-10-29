import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'DepInfSisProyect';
  isAuth=false;

  constructor(
    private auth:AuthService
  ){}

  ngOnInit(): void {
    this.isAuth=this.auth.isAuthenticated();
  }

  logout(){
    
    return this.auth.logout();
  }
  
}
