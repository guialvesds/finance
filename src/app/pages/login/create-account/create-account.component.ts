import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent implements OnInit{
  ngOnInit(): void {
   
  }

  constructor(
    private _router: Router
  ){}

  public navigate(router: string): void {
    this._router.navigate([router]);
  }



}
