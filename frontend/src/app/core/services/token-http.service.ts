import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../shared/constants';
import { firstValueFrom } from 'rxjs';
import { User } from '../../shared/models/auth';
import { TokenResponse } from '../../shared/models/token';

@Injectable({
  providedIn: 'root'
})
export class TokenHttpService {


  module_api_segment = 'token/';
  tokenHttpServiceUrl = API_URL+this.module_api_segment

  constructor(private httpClient: HttpClient) { }

  async getToken(): Promise<TokenResponse> {
    try {
      const response = await firstValueFrom(this.httpClient.post<TokenResponse>(`${this.tokenHttpServiceUrl}generate_token/`,{}));
      return response;
    } catch (error) {
      throw 'An error occurred during login. Please try again.';
    }
  }

}
