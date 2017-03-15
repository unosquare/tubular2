import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }         from './app.component';
import { MainGridComponent }    from './main-grid.component';
import { FormComponent }        from './form.component';
import { LoginComponent }       from './login.component';

const routes: Routes = [
    { path: '', redirectTo: '/grid', pathMatch: 'full' },
    { path: 'grid', component: MainGridComponent },
    { path: 'form', component: FormComponent },
    { path: 'form/:id', component: FormComponent },
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }