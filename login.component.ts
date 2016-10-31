import { Component } from '@angular/core';
import { DataService } from './tubular-data.service.ts';
import { FormBuilder, FormGroup, Validators } from '@aungular/forms';

@Component({
    selector: 'my-app',
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

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    constructor(private dataService: DataService, private formBuilder: FormBuilder) { }

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
