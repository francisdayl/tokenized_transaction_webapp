import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListTokenComponent } from './admin/list-token/list-token.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { HomeComponent } from './dashboard/home/home.component';
import { TokenComponent } from './dashboard/token/token.component';
import { TokenHttpComponent } from './dashboard/token-http/token-http.component';
import { adminUsersTokenSummaryResolver, adminTokensUserResolver } from './core/resolvers/admin.resolver';

export const routes: Routes = [

    {path: "", component:LoginComponent},
    {path: "login", component:LoginComponent},
    {path: "register", component:RegisterComponent},
    {path: "admin-dashboard", component:ListUserComponent, resolve: {data: adminUsersTokenSummaryResolver}},
    {path: "admin-dashboard/:id", component:ListTokenComponent,resolve: {data: adminTokensUserResolver}},
    {path: "dashboard", component:HomeComponent},
    {path: "token", component:TokenComponent},
    {path: "token-http", component:TokenHttpComponent},

];
