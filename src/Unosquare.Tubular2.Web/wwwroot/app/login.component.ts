import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TubularDataService } from '@tubular2/tubular2';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'login',
    template: `<form [formGroup]="loginForm" (ngSubmit)="onSubmit(loginForm)">
                    <div class="row">
                        <div class="col-md-4 col-md-push-4">
                            <div class="form-group">
                                <label>User:</label>
                                <input class="form-control" type="text" formControlName="username"/>
                                <label>Password:</label>
                                <input class="form-control" type="password" formControlName="password"/>
                             </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-sm btn-success btn-block" [disabled]="loginForm.invalid">Login</button>
                            </div>
                            <span class="form-group" *ngIf=""></span>
                        </div>
                    </div>
              </form>`
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private dataService: TubularDataService, private router: Router, private toastr: ToastsManager) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(data) {
        let username = data.value.username;
        let password = data.value.password;
        this.dataService.authenticate('http://tubular.azurewebsites.net/token', username, password,
            () => {
                this.router.navigate(['/']);
            }, (error) => {
                this.toastr.error(error.status + ' - ' + error.errorBody.error_description, 'Filed Login');
                this.router.navigate(['/login']);
        }, true);      
    }
}
