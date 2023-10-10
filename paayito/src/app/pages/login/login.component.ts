import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,NgForm } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { Login } from '../../_models/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
  public login: Login;
  public loginForm!: FormGroup;
  isLogin: boolean = false

  constructor(private authenticationService: AuthenticationService) {
    this.login = new Login('','');
   }

   ngOnInit() {
    this.isUserLogin();
  }

  public onSubmit() {
    this.authenticationService.login(this.login);
  }

  isUserLogin(){
    if(this.authenticationService.isLoggedIn()){
        this.isLogin = true;
    }

  }

}