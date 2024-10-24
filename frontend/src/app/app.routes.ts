import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { authGuard } from './core/guards/auth.guard';
import { IndexComponent } from './dashboard/index/index.component';

export const routes: Routes = [
    { path: '', component:LoginComponent },
    {path:'login', component: LoginComponent},
    {path:'dashboard', component: IndexComponent},
    {path:'admin-dashboard', component: ListUserComponent, canActivate:[authGuard]},
];
