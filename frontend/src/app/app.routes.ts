import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ProjectsComponent } from './projects.component';
import { authGuard } from './auth.guard';
export const routes:Routes=[
 {path:'login',component:LoginComponent},{path:'register',component:RegisterComponent},
 {path:'projects',component:ProjectsComponent,canActivate:[authGuard]},
 {path:'',redirectTo:'projects',pathMatch:'full'},{path:'**',redirectTo:'projects'}
];
