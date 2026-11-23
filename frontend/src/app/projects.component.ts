import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor,NgIf,DatePipe } from '@angular/common';
import { ProjectService } from './project.service';
@Component({standalone:true,imports:[FormsModule,NgFor,NgIf,DatePipe],template:`
<div class="page-head"><div><p class="eyebrow">WORKSPACE</p><h1>Project Management</h1><p class="muted">Create and manage your software projects.</p></div>
<div class="stat card"><strong>{{projects.length}}</strong><span>Total projects</span></div></div>
<section class="card form-card"><h2>{{editingId?'Edit project':'Create new project'}}</h2>
<form (ngSubmit)="save()"><div class="grid"><div><label>Project name</label><input name="name" [(ngModel)]="form.name" required></div>
<div><label>Status</label><select name="status" [(ngModel)]="form.status"><option>PLANNING</option><option>IN_PROGRESS</option><option>COMPLETED</option><option>ON_HOLD</option></select></div></div>
<label>Description</label><textarea name="description" rows="3" [(ngModel)]="form.description"></textarea>
<div class="actions"><button class="primary">{{editingId?'Update project':'Add project'}}</button><button type="button" class="secondary" *ngIf="editingId" (click)="cancel()">Cancel</button></div></form>
<p class="error">{{error}}</p></section>
<section class="projects"><article class="card project" *ngFor="let p of projects">
<div class="project-top"><span class="badge">{{p.status}}</span><small>#{{p.id}}</small></div><h3>{{p.name}}</h3>
<p class="muted">{{p.description||'No description added.'}}</p>
<div class="project-foot"><small>Created {{p.createdAt|date:'mediumDate'}}</small>
<div><button class="secondary small" (click)="edit(p)">Edit</button><button class="danger small" (click)="remove(p.id)">Delete</button></div></div>
</article></section><p *ngIf="!projects.length" class="empty card">No projects yet. Create your first project above.</p>`})
export class ProjectsComponent implements OnInit {
 projects:any[]=[];editingId:number|null=null;error='';
 form:any={name:'',description:'',status:'PLANNING'};
 constructor(private api:ProjectService){}
 ngOnInit(){this.load();}
 load(){this.api.all().subscribe({next:r=>this.projects=r,error:()=>this.error='Could not load projects. Check that the backend is running.'});}
 save(){const req=this.editingId?this.api.update(this.editingId,this.form):this.api.create(this.form);
 req.subscribe({next:()=>{this.cancel();this.load();},error:e=>this.error=e.error?.message||'Could not save project'});}
 edit(p:any){this.editingId=p.id;this.form={name:p.name,description:p.description||'',status:p.status};window.scrollTo({top:0,behavior:'smooth'});}
 cancel(){this.editingId=null;this.form={name:'',description:'',status:'PLANNING'};this.error='';}
 remove(id:number){if(confirm('Delete this project?'))this.api.delete(id).subscribe({next:()=>this.load(),error:()=>this.error='Delete failed'});}
}
