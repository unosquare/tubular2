import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TubularDataService } from '@tubular2/tubular2';

@Component({
    selector: 'login',
    template: `<form [formGroup]="loginForm">
                <div class="form-group">
                    <label>User:<label>
                    <input type="text" formControlName="username">
                    <label *ngIf="LoginForm.controls.username.errors">Required<label>
                    <label>Password:<label>
                    <input type="text" formControlName="password">
                    <label *ngIf="LoginForm.controls.username.errors">Required<label>
                    <button type="submit">Login</button>
                </div>
              <form>`
})

export class Login {
    loginForm: FormGroup;
    constructor(private dataService: TubularDataService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    private onSubmit(username, password) {
        this.dataService.authenticate('http://tubular.azurewebsites.net/token', username, password);
    }
}
