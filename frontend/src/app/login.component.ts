import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
@Component({standalone:true,imports:[FormsModule,RouterLink],template:`
<section class="auth card"><p class="eyebrow">WELCOME BACK</p><h1>Sign in to Nexus</h1>
<form (ngSubmit)="submit()"><label>Username</label><input name="username" [(ngModel)]="form.username" required>
<label>Password</label><input type="password" name="password" [(ngModel)]="form.password" required>
<button class="primary">Login</button></form><p class="error">{{error}}</p>
<p>New here? <a routerLink="/register">Create an account</a></p></section>`})
export class LoginComponent {
 form={username:'',password:''};error='';
 constructor(private auth:AuthService,private router:Router){}
 submit(){this.auth.login(this.form).subscribe({next:()=>this.router.navigate(['/projects']),error:e=>this.error=e.error?.message||'Login failed'});}
}
