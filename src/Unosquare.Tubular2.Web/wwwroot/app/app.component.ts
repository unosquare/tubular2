import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { TubularGrid, TubularDataService } from '@tubular2/tubular2';
 
@Component({
    selector: 'my-app',
    templateUrl: '/app/app.component.html'
})
export class AppComponent {
    constructor(private ds:TubularDataService, private router: Router){
        this.ds.setTokenUrl('http://tubular.azurewebsites.net/token');
    }
    logout(){
        this.ds.removeAuthentication();
        this.router.navigate(['']);
    }
 }