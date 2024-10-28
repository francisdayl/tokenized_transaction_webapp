import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  numberForm: FormGroup;
  imageUrl: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.numberForm = this.fb.group({
      number: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{6}$')
      ]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.numberForm.valid) {
      const number = this.numberForm.get('number')?.value;
      // Replace this URL with your actual API endpoint
      this.http.post<any>(`http://127.0.0.1:8000/api/token/save_tokenized_transaction/`,
        {"token_number":number},{headers:{"Authorization":"Token fda4189a8334083381a457f1e2283e9a01633f2d"}})
        .subscribe({
          next: (response) => {
            console.log(response)
            this.imageUrl = response.image_url;
            this.error = null;
          },
          error: (error) => {
            this.error = 'Failed to load image. Please try again.';
            this.imageUrl = null;
          }
        });
    }
  }
}
