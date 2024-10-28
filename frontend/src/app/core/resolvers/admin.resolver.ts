import { ResolveFn } from '@angular/router';
import { TokenHttpService } from '../services/token-http.service';
import { inject } from '@angular/core';
import { TokenUserResponse, UserTokenResponse } from '../../shared/models/auth';


export const adminUsersTokenSummaryResolver: ResolveFn<UserTokenResponse> = (route, state) => {
  const storeService = inject(TokenHttpService); 

  return storeService.getUsersListsTokenSummary();
};

export const adminTokensUserResolver: ResolveFn<TokenUserResponse> = (route, state) => {
  const userId = route.params['id'];
  const storeService = inject(TokenHttpService); 

  return storeService.getUserTokens(userId);
};