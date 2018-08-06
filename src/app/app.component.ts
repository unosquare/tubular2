import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private router: Router) {

    }

    logout() {
        this.router.navigate(['']);
    }
}
