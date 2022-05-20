import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  loginForm: FormGroup = this.formBuilder.group({
    email: ["", Validators.email],
    password: ["", Validators.minLength(8)]
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.auth.login(this.loginForm.value);
  }

}
