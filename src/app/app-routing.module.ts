import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
  {path: 'entries', loadChildren: './pages/entries/entries.module#EntriesModule'},
  {path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesModule'},
  {path: 'reports', loadChildren: './pages/reports/reports.module#ReportsModule'},
  {path: 'login', component: LoginComponent},  

  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
