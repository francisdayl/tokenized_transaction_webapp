import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login( this.loginForm.value);
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }
  

  // this.authService.login(this.loginForm.value).subscribe({
  //   next: () => {
  //     this.router.navigate(['/dashboard']);
  //   },
  //   error: (error) => {
  //     console.log("Error")
  //     this.markFormGroupTouched(this.loginForm);
  //     // this.isLoading = false;
  //     // this.snackBar.open('Login failed. Please try again.', 'Close', {
  //     //   duration: 3000
  //     // });
  //   }
  // }) 
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
