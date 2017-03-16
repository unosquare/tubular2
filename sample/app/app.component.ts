import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { TubularAuthService } from '@tubular2/tubular2';
 
@Component({
    selector: 'my-app',
    templateUrl: '/app/app.component.html'
})
export class AppComponent {
    constructor(private tbAuthService:TubularAuthService, private router: Router){
        this.tbAuthService.setTokenUrl('http://tubular.azurewebsites.net/token');
        this.tbAuthService.setRefreshTokenUrl('http://tubular.azurewebsites.net/token');
    }
    logout(){
        this.tbAuthService.removeAuthentication();
        this.router.navigate(['']);
    }
 }