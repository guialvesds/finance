import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../../core/services/user.service.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Users } from '../../../shared/models/users.model';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login-access',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-access.component.html',
  styleUrl: './login-access.component.scss'
})
export class LoginAccessComponent implements OnInit {

  userForm = new FormGroup({
    email: new FormControl(''),
    pass: new FormControl('')
  });

  errorMessage: boolean = false;
  message!: string;

  subManger!: Subscription;
  unsubscribeSignal: Subject<void> = new Subject();

  ngOnInit(): void {}

  constructor(
    private _route: Router,
    private _userService: UserServiceService,
  ) { }

  public navigate(router: string): void {
    this._route.navigate([router]);
  }

  public login(event: Event): void {
    event.preventDefault();

    console.log(this.userForm.value);
    
   this.subManger = this._userService.login().pipe(
    takeUntil(this.unsubscribeSignal.asObservable()),
  ).subscribe({
      next: (res) => {

        const dataRes: any = res.body;
        const emailCompare = dataRes[0].email === this.userForm.value.email;
        const passCompare = dataRes[0].pass === this.userForm.value.pass;

        if(  emailCompare && passCompare) { 
          this._route.navigate(['home']);
          this.errorMessage = false;          
        }else {
          this.errorMessage = true;
          this.message = "E-mail ou senha incorreto.";
          
          setTimeout(() => {
            this.errorMessage = false
          }, 5000);

        }        
      },
      error: (err) => {
        console.error(err);        
      }
    });
  }
}
