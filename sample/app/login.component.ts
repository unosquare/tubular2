import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TubularAuthService } from '@tubular2/tubular2';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'login',
    templateUrl: '/app/login.component.html'
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private tbAuthService: TubularAuthService, private router: Router, private toastr: ToastsManager) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(data) {
        let username = data.value.username;
        let password = data.value.password;

        this.tbAuthService.authenticate(username, password)
            .subscribe(
            data => {
                console.log("Authenticated", data);
                this.router.navigate(['/exp']);
            },
            error => {
                this.toastr.error(error.status + ' - ' + error.errorBody.error_description, 'Filed Login');
                this.router.navigate(['/login']);
            }
            );
    }
}
