import { Component, OnInit, Injectable, Inject, Optional } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Headers} from '@angular/http';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SETTINGS_PROVIDER, ITubularSettingsProvider } from '@tubular2/tubular2';

import 'rxjs/add/operator/map';

@Component({
    selector: 'login',
    templateUrl: '/app/login.component.html'
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    private userData = {
        isAuthenticated: false,
        username: '',
        bearerToken: '',
        expirationDate: null,
        role: '',
        refreshToken: ''
    };

    constructor(
        @Optional() @Inject(SETTINGS_PROVIDER) private settingsProvider: ITubularSettingsProvider,
        private fb: FormBuilder,
        private http: Http,
        private router: Router) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(data) {
        let username = data.value.username;
        let password = data.value.password;

        let requestArgs = <RequestOptionsArgs>{
            headers: new Headers(
                {
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
        }

        this.http.post('http://tubular.azurewebsites.net/api/token', `grant_type=password&username=${username}&password=${password}`, requestArgs)
            .map((data) => this.handleSuccessCallback(data))
            .subscribe(
            data => {
                console.log("Authenticated", data);
                this.router.navigate(['/exp']);
            },
            error => {
                let errorJson = error.json();
                alert(error.status + ' - ' + errorJson.error_description);
                this.router.navigate(['/login']);
            }
            );
    }

    private handleSuccessCallback(data) {
        data = JSON.parse(data._body);
        this.userData.isAuthenticated = true;
        this.userData.username = data.userName;
        this.userData.bearerToken = data.access_token;
        this.userData.expirationDate = new Date(new Date().getTime() + data.expires_in * 1000);
        this.userData.role = data.role;
        this.userData.refreshToken = data.refresh_token;

        if (this.settingsProvider) {
            this.settingsProvider.put('auth_data', JSON.stringify(this.userData));
        }
    }
}
