import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    console.log('LoginComponent initialized');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log('Form submitted');
    if (this.loginForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const {email, password} = this.loginForm.value;
    console.log(`Attempting to log in with email: ${email}`);
    this.authService.signIn(email, password).then(() => {
      console.log('Login successful');
      this.router.navigate(['/']);
    }).catch(error => {
      console.error('Login error:', error);
      this.error = error.message;
    });
  }

}
