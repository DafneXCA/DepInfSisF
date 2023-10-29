import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './authentication/services/auth.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService,) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken=this.auth.getToken();

    if(authToken!=null){
      
      const authReq=request.clone({ setHeaders: {
        Authorization: `Bearer ${authToken}`
      } });

      return next.handle(authReq);
    }else{
      return next.handle(request);
    }
  }
}
