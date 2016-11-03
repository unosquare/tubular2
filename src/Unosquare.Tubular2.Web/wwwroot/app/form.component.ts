import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'sample-form',
    templateUrl: '/app/form.component.html'
})
export class FormComponent {

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = params['id']; 
            console.log(id);
        });
    }
}
