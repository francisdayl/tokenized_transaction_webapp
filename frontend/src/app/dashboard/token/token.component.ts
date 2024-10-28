import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenService } from '../../core/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-token',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './token.component.html',
  styleUrl: './token.component.css'
})
export class TokenComponent implements OnInit, OnDestroy {
  
  currentToken: string = '';
  private tokenSubscription?: Subscription;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tokenService.connectWebSocket();
    this.tokenSubscription = this.tokenService.token$.subscribe(
      token => this.currentToken = token
    );
  }

  ngOnDestroy(): void {
    this.tokenService.disconnect();
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }
}
