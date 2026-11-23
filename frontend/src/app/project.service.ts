import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({providedIn:'root'})
export class ProjectService {
 private api='http://localhost:8080/api/projects';
 constructor(private http:HttpClient){}
 all(){return this.http.get<any[]>(this.api);}
 create(p:any){return this.http.post(this.api,p);}
 update(id:number,p:any){return this.http.put(`${this.api}/${id}`,p);}
 delete(id:number){return this.http.delete(`${this.api}/${id}`);}
}
