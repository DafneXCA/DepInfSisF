import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/enviroments/enviroment';
import { User } from '../Models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class AuthService{

    readonly root_url=`${environment.BACK_END_HOST}`

    constructor(
        private router:Router,
        private http:HttpClient
    ){}

    login(user:string,password:string){
        var userLogin=new User();
        userLogin.user=user;
        userLogin.password=password;

        console.log(userLogin);

        return this.http.post<any>(this.root_url+'login',userLogin)
        .pipe(
            map(user => {

                localStorage.setItem('token', user.token);
                return true;

              })           
        );
    }

    getToken(){
        return localStorage.getItem('token');
    }
    
    isAuthenticated():boolean{
        const token=localStorage.getItem('token');
        return token!=null;
    }

    logout(){
        localStorage.removeItem('token');
        this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
    }
}