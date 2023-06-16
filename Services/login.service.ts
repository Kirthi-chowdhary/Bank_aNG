import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { tap } from 'rxjs';
import * as moment from 'moment'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  loginauth(email:string, password: string){
    return this.http.post("http://localhost:3000/auth",{email,password})
    .pipe(
      tap((res=>this.setSession(res))),
      shareReplay()
    );
  }

  private setSession(authResult:any){
    // console.log(authResult);
    const expiresAt = moment().add(authResult.expiresIn,"second");
    localStorage.setItem('token',authResult.idToken);
    localStorage.setItem("expires_at",JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  investments(){
    return this.http.get('/investments');
  }

  savings(){
    return this.http.get('/savings');
  }

}
