import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(form: FormGroup) {
    const passwordValue = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;
    if (passwordValue !== confirmPassword) {
      form.get('confirmPassword').setErrors({mismatch: true});
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    const {email, password} = this.registerForm.value;
    this.authService.signUp(email, password).then(() => {
      return this.router.navigate(['/']);
    }).catch(error => {
      this.error = error.message;
    });
  }
}





