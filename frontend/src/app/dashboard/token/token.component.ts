import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { TokenService } from '../../core/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-token',
  standalone: true,
  imports: [MatCardModule,ReactiveFormsModule, CommonModule],
  templateUrl: './token.component.html',
  styleUrl: './token.component.css'
})
export class TokenComponent implements OnInit, OnDestroy {
  
  token: { temporal_token: string; token_creation: string } | null = null;
  error: string | null = null;
  remainingTime: string = '';
  progressPercentage: number = 100;
  private tokenSubscription?: Subscription;
  private readonly TOKEN_DURATION = 60000; 
  
  constructor(
    private tokenService: TokenService,
  ) {}

  ngOnInit(): void {
    this.tokenService.connectWebSocket();
    this.tokenSubscription = this.tokenService.token$.subscribe(
      token => this.token = token
    );
    this.startTokenCountdown();
    
  }

  ngOnDestroy(): void {
    this.tokenService.disconnect();
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
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
        }
      }
    });
  }

}
