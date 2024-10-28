import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TokenHttpService } from '../../core/services/token-http.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-token-http',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './token-http.component.html',
  styleUrl: './token-http.component.css'
})
export class TokenHttpComponent implements OnInit {
  token: { temporal_token: string; token_creation: string } | null = null;
  error: string | null = null;
  remainingTime: string = '';
  progressPercentage: number = 100;
  private readonly TOKEN_DURATION = 60000; // 1 minute in milliseconds

  constructor(private tokenService: TokenHttpService) {}

  ngOnInit() {
    this.fetchToken();
    this.startTokenCountdown();
  }

  ngOnDestroy() {
    
  }

  private fetchToken() {
    this.tokenService.getToken().then(data => {
      this.token = data;
    });
  }

  private startTokenCountdown() {
    interval(1000).subscribe(() => {
      if (this.token) {
        const creation = new Date(this.token.token_creation).getTime();
        const now = new Date().getTime();
        const elapsed = now - creation;
        const remaining = this.TOKEN_DURATION - elapsed;

        if (remaining > 0) {
          const seconds = Math.ceil(remaining / 1000);
          this.remainingTime = `${seconds} seconds`;
          this.progressPercentage = (remaining / this.TOKEN_DURATION) * 100;
        } else {
          this.remainingTime = 'Refreshing...';
          this.progressPercentage = 0;
          this.fetchToken();
        }
      }
    });
  }
}
