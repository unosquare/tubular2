import { Component, OnInit, Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SETTINGS_PROVIDER, ITubularSettingsProvider } from 'tubular-lib';

import { map } from 'rxjs/operators';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
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
        private http: HttpClient,
        private router: Router) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(data) {
        const username = data.value.username;
        const password = data.value.password;

        const requestArgs = {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
        };

        this.http.post('http://tubular.azurewebsites.net/api/token',
            `grant_type=password&username=${username}&password=${password}`,
            requestArgs).
            pipe(map(response => this.handleSuccessCallback(response)))
            .subscribe(
            response => {
                console.log('Authenticated', response);
                this.router.navigate(['/grid']);
            },
            error => {
                    alert(error.status + ' - ' + error.error.error_description);
                this.router.navigate(['/login']);
            }
            );
    }

    private handleSuccessCallback(data) {
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
