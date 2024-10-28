import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../shared/constants';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenUserResponse, User, UserTokenResponse } from '../../shared/models/auth';
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

  getUsersListsTokenSummary(): Observable<UserTokenResponse> {
    return this.httpClient.get<UserTokenResponse>(`${this.tokenHttpServiceUrl}get_users_lists_token_summary/`,{});
  }
  
  getUserTokens(id: number): Observable<TokenUserResponse> {
    return this.httpClient.post<TokenUserResponse>(`${this.tokenHttpServiceUrl}get_user_tokens/`,{"user_id":id});
  }


}
