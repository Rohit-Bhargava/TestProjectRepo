import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "src/app/services/auth.service";

import { Role } from "src/app/models/role";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  selectedValue: string;
  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }

  roles: Role[] = [
    {value: 'admin', viewValue: 'Admin'},
    {value: 'manager', viewValue: 'Manager'},
    {value: 'user', viewValue: 'User'},
  ];

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required, Validators.minLength(10)]),
      role: new FormControl([''], Validators.required),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  signup(): void {
    this.authService.signup(this.signupForm.value).subscribe((msg) => {
      console.log(msg);
      this.router.navigate(["login"]);
    });
  }
}
