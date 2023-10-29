import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public loginForm!:FormGroup;


  constructor(
    private formBuilder:FormBuilder,
    private auth:AuthService,
    private router:Router
  ){
  }

  ngOnInit(): void {
    this.buildForm();
  }
  
  buildForm(){
    this.loginForm= this.formBuilder.group({
      username:['',[Validators.required,Validators.maxLength(100)]],
      password:['',[Validators.required]]
    });
  }

  login(){
    var login=this.loginForm.value;

    this.auth.login(login.username,login.password).subscribe(
      ()=>{
        this.router.navigate(['/homeAdmin']).then(() => {
          window.location.reload();
        });
      },
      (error:any)=>{
        alert(error.error.error.message)
      }
    );
  }

}
