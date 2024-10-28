import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { API_URL } from '../../shared/constants';
import { TokenResponse } from '../../shared/models/token';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  private tokenSubject = new BehaviorSubject<TokenResponse | null>(null);
  token$ = this.tokenSubject.asObservable();
  private ws: WebSocket | null = null;

  constructor() {}

  connectWebSocket(): void {
    if (this.ws) {
      this.ws.close();
    }

    this.ws = new WebSocket(`${API_URL}ws/token/`);

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.tokenSubject.next(data.token);
    };

    this.ws.onclose = () => {
      setTimeout(() => this.connectWebSocket(), 1000);
    };
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
