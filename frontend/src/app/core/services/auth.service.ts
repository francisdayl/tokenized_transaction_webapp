import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, tap } from 'rxjs';
import { User, UserLoginData, UserRegistrationData } from '../../shared/models/auth';
import { Router } from '@angular/router';
import { API_URL } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  module_api_segment = 'auth/';
  auth_url = API_URL+this.module_api_segment;
  constructor(private router: Router, private httpClient:HttpClient) { }
  currentUserSig = signal<User | undefined | null>(undefined);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  async registerUser(userData: UserRegistrationData): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpClient.post<User>(`${this.auth_url}register/`, userData));
      console.log(response)
      return "XD";
    } catch (error) {
      throw error;
    }
  }
  async login(userLoginData: UserLoginData): Promise<string> {
    try {
      const response = await firstValueFrom(this.httpClient.post<User>(`${this.auth_url}login/`,
         {"username":userLoginData.username, "password":userLoginData.password}));
      console.log(response)
      
      localStorage.setItem('token', response.token);
      this.router.navigate(['/dashboard']);
      return response.token;
    } catch (error) {
      throw 'An error occurred during login. Please try again.';
    }
  }

  // login(userLoginData: UserLoginData): Observable<any> {
  //   return this.httpClient.post(this.auth_url+"login",userLoginData)
  //     .pipe(
  //       tap((response: any) => {
  //         localStorage.setItem('token', response.token);
  //         this.isAuthenticatedSubject.next(true);
  //       })
  //     );
  // }

  async verifyToken(): Promise<boolean> {
    try {
      const response = await firstValueFrom(this.httpClient.get<any>(API_URL+"login"));
      if (response instanceof Object) {
        // Assuming there's a property like 'id' that indicates a valid user
        if (response.id) {
          return true; // Token is valid, and user is authenticated
        } else {
          localStorage.removeItem('token');
          return false; // Token is valid, but the user is not authenticated
        }
      } else {
        return false; // Token is invalid or unauthorized
      }
    } catch (error) {
      return false; // Token is invalid or unauthorized
    }
  }

  logout(){
    this.removeStorageItem('token');
    this.clearSessionStorage();
    this.router.navigate(['/login']);
  }
  private clearSessionStorage(): void {
    sessionStorage.clear();
  }
  private removeStorageItem(key: string): void {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }

}
