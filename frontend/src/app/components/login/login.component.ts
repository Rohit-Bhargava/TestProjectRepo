import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "src/app/services/auth.service";
import { Role } from "src/app/models/role";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  roles: Role[] = [
    {value: 'admin', viewValue: 'Admin'},
    {value: 'manager', viewValue: 'Manager'},
    {value: 'user', viewValue: 'User'},
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      roles: new FormControl([''], Validators.required),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  login(): void {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.role)
      .subscribe();
  }
}
