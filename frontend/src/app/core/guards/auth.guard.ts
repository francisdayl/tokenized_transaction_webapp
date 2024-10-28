import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';

export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}