import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
@Component({standalone:true,imports:[FormsModule,RouterLink],template:`
<section class="auth card"><p class="eyebrow">GET STARTED</p><h1>Create account</h1>
<form (ngSubmit)="submit()"><label>Username</label><input name="username" [(ngModel)]="form.username" required minlength="3">
<label>Email</label><input type="email" name="email" [(ngModel)]="form.email" required>
<label>Password (minimum 8 characters)</label><input type="password" name="password" [(ngModel)]="form.password" required minlength="8">
<button class="primary">Register</button></form><p class="error">{{error}}</p>
<p>Already registered? <a routerLink="/login">Login</a></p></section>`})
export class RegisterComponent {
 form={username:'',email:'',password:''};error='';
 constructor(private auth:AuthService,private router:Router){}
 submit(){this.auth.register(this.form).subscribe({next:()=>this.router.navigate(['/projects']),error:e=>this.error=e.error?.message||'Registration failed'});}
}
