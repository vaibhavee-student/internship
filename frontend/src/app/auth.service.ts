import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
@Injectable({providedIn:'root'})
export class AuthService {
 private api='http://localhost:8080/api';
 constructor(private http:HttpClient){}
 login(data:{username:string,password:string}){return this.http.post<any>(`${this.api}/auth/login`,data).pipe(tap(r=>this.save(r)));}
 register(data:{username:string,email:string,password:string}){return this.http.post<any>(`${this.api}/auth/register`,data).pipe(tap(r=>this.save(r)));}
 private save(r:any){localStorage.setItem('token',r.token);localStorage.setItem('username',r.username);localStorage.setItem('role',r.role);}
 logout(){localStorage.clear();}
 isLoggedIn(){return !!localStorage.getItem('token');}
}
