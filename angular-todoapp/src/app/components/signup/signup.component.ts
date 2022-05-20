import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/data-models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  signupForm: FormGroup = this.formBuilder.group({
    username: ["", Validators.required],
    email: ["", Validators.email],
    password: ["", Validators.minLength(8)]
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.auth.signup(new User(this.signupForm.get("email")?.value, this.signupForm.get("password")?.value));
  }

}
