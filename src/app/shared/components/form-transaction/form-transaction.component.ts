import { Component, Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule, DialogRef } from '@angular/cdk/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction.service';



@Component({
  selector: 'app-form-transaction',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-transaction.component.html',
  styleUrl: './form-transaction.component.scss'
})
export class FormTransactionComponent implements OnInit {

  transactionForm = new FormGroup({
    userName: new FormControl(''),
    describe: new FormControl(''),
    type: new FormControl(''),
    dataTransfer: new FormControl(''),
    value: new FormControl(''),
  });

  putDescription!: String;
  putDes: boolean =  false;
  putDesErr: boolean =  false;
  

  constructor(public dialogRef: DialogRef, private _transaction: TransactionService
  ) { }

  ngOnInit(): void {
  }

  submit(): void {   
    
    if(this.transactionForm.value.type == "" || this.transactionForm.value.describe == ""  || this.transactionForm.value.value == "" ) {
       
      this.putDesErr = true;
      this.putDescription = "Preencher todos os campos!"

      setTimeout(() => {
     this.putDesErr = false;
     this.putDescription = ""
      }, 3000);

      return
    }

    const dataForm: FormData | any = {
      user_name: 'Guilherme Alves',
      describe: this.transactionForm.value.describe,
      to_wallet: this.transactionForm.value.type,
      type: this.transactionForm.value.type == 'Entrada' ? '0' : '1',
      date: this.getDate(),
      value: this.transactionForm.value.value,
    }

   

    console.log(dataForm.type);
    

    this._transaction.putTransaction(dataForm).subscribe({
      next: (res) => {

       

        setTimeout(() => {
          this.putDes = true;
          this.putDescription = "Criado com sucesso!"
        }, 3000);
        
      },
      error: (err) => {
        console.error(err);
        
      }
    });
    
    console.log(dataForm);
    
  }

  // Formatação de moeda real pt-Br
  coinRealFormat(data: any): string {
    return data.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  }

  getDate(): string {
    const dateNow = new Date();
  
    const dateActual: any = {
      day: dateNow.getDate(),
      month: dateNow.getMonth() + 1,
      year: dateNow.getFullYear()
    }      
  
    dateActual.day = dateActual.day < 10 ? '0' + dateActual.day : dateActual.day;
    dateActual.month = dateActual.month < 10 ? '0' + dateActual.month : dateActual.month;
  
    return `${dateActual.day} /${dateActual.month} /${dateActual.year}`;
  }  
}
