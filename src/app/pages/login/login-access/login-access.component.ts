import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  ) { }

  public navigate(router: string): void {
    this._route.navigate([router]);
  }

}
