import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeAccessComponent } from '../../home/home-access/home-access.component';

@Component({
  selector: 'app-login-access',
  standalone: true,
  imports: [],
  templateUrl: './login-access.component.html',
  styleUrl: './login-access.component.scss'
})
export class LoginAccessComponent implements OnInit {
  ngOnInit(): void {
    
  }

  constructor(
    private _route: Router,
  ) {}

  home()  {
    this._route.navigate(['home/HomeAccessComponent']);
    console.log('Clicou');
    
  }

}
