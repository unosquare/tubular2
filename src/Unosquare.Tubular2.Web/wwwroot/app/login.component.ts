import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TubularDataService } from '@tubular2/tubular2';

@Component({
    selector: 'login',
    template: `<form [formGroup]="loginForm" (ngSubmit)="onSubmit(loginForm)">
                    <div class="form-group">
                        <label>User:</label>
                        <input class="form-control" type="text" formControlName="username"/>
                        <label *ngIf="loginForm.controls.username.errors">Required</label>
                        <label>Password:</label>
                        <input class="form-control" type="password" formControlName="password"/>
                        <label *ngIf="loginForm.controls.password.errors">Required</label>
                        <button type="submit" class="" [disabled]="loginForm.invalid">Login</button>
                    </div>
              </form>`
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private dataService: TubularDataService) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(data) {
        let username = data.value.username;
        let password = data.value.password;
        this.dataService.authenticate('http://tubular.azurewebsites.net/token', username, password);
    }
}
