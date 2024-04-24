import { Component, Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule, DialogRef } from '@angular/cdk/dialog';



@Component({
  selector: 'app-form-transaction',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule, DialogModule],
  templateUrl: './form-transaction.component.html',
  styleUrl: './form-transaction.component.scss'
})
export class FormTransactionComponent implements OnInit {

  constructor(public dialogRef: DialogRef
  ) { }
  ngOnInit(): void {
  }
}
