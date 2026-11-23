import { Component } from '@angular/core';
import { Router,RouterLink,RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './auth.service';
@Component({selector:'app-root',standalone:true,imports:[RouterOutlet,RouterLink,NgIf],template:`
<header><a routerLink="/projects" class="brand">⚡ NeuroForge <span>Nexus</span></a>
<nav><a routerLink="/projects" *ngIf="auth.isLoggedIn()">Projects</a>
<a routerLink="/login" *ngIf="!auth.isLoggedIn()">Login</a>
<a routerLink="/register" *ngIf="!auth.isLoggedIn()">Register</a>
<button *ngIf="auth.isLoggedIn()" (click)="logout()">Logout</button></nav></header>
<main><router-outlet></router-outlet></main>`})
export class AppComponent {
 constructor(public auth:AuthService,private router:Router){}
 logout(){this.auth.logout();this.router.navigate(['/login']);}
}
