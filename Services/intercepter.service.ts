import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const jwtToken = localStorage.getItem("token");
    console.log(jwtToken)

    if(req.url.includes('/savings') && jwtToken){
      const copyToken = req.clone({
        headers : req.headers.set("Authorization", "Mytoken " + jwtToken)
      });
      return next.handle(copyToken);
    }else if(req.url.includes('/investments')){
      return next.handle(req);
    }else {
      return next.handle(req);
    }
  }

  
}