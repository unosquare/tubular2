import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import { GridComponent }   from './grid.component';
import { FormComponent }   from './form.component';

const routes: Routes = [
    { path: '', redirectTo: '/grid', pathMatch: 'full' },
    { path: 'grid', component: GridComponent },
    { path: 'form', component: FormComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }