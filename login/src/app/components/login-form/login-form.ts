import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
   standalone: true,
  selector: 'app-login',
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css'],
   imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class Login implements OnInit {

  loginForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  handleSubmit(): void {
    // clear old messages
    this.successMessage = '';
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.successMessage = 'Login successful!';
        this.loginForm.reset();       
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.message || 'Login failed. Please try again.';
        this.isSubmitting = false;
      },      
    });
  }
}