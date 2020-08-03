import { Injectable } from '@angular/core';
import * as decode from 'jwt-decode';
import { BehaviorSubject, Observable, pipe, throwError } from 'rxjs';
import { catchError, filter, flatMap, map, tap } from 'rxjs/operators';

import { IUser, User } from './../user/user/user';
import { transformError } from '../common/common';
import { Role } from './auth.enum';
import { CacheService } from './cache.service';

export interface IAuthStatus {
  isAuthenticated: boolean;
  userRole: Role;
  userId: string;
}
export interface IServerAuthResponse {
  accessToken: string;
}
export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>;
  readonly currentUser$: BehaviorSubject<IUser>;
  login(email: string, password: string): Observable<void>;
  logout(clearToken?: boolean): void;
  getToken(): string;
}

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
};

@Injectable()
export abstract class AuthService extends CacheService implements IAuthService {
  constructor() {
    super();
    if (this.hasExpiredToken()) {
      this.logout(true);
    } else {
      this.authStatus$.next(this.getAuthStatusFromToken());
      // To load user on browser refresh,
      // resume pipeline must activate on the next cycle
      // Which allows for all services to constructed properly
      setTimeout(() => this.resumeCurrentUser$.subscribe(), 0);
    }
  }
  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus);
  readonly currentUser$ = new BehaviorSubject<IUser>(new User());

  private getAndUpdateUserIfAuthenticated = pipe(
    filter((status: IAuthStatus) => status.isAuthenticated),
    flatMap(() => this.getCurrentUser()),
    map((user: IUser) => this.currentUser$.next(user)),
    catchError(transformError)
  );

  protected readonly resumeCurrentUser$ = this.authStatus$.pipe(
    this.getAndUpdateUserIfAuthenticated
  );

  protected abstract authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse>;
  protected abstract transformJwtToken(token: unknown): IAuthStatus;
  protected abstract getCurrentUser(): Observable<User>;

  login(email: string, password: string): Observable<void> {
    this.clearToken();
    const loginResponse$ = this.authProvider(email, password).pipe(
      map((value) => {
        this.setToken(value.accessToken);
        return this.getAuthStatusFromToken();
        // const token = decode(value.accessToken);
        // return this.transformJwtToken(token);
      }),
      tap((status: IAuthStatus) => this.authStatus$.next(status)),
      this.getAndUpdateUserIfAuthenticated
    );
    loginResponse$.subscribe({
      error: (err) => {
        console.error(err);
        this.logout();
        return throwError(err);
      },
    });
    return loginResponse$;
  }
  logout(clearToken?: boolean | undefined): void {
    if (clearToken) {
      this.clearToken();
    }
    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0);
  }
  getToken(): string {
    return this.getItem('jwt') ?? '';
  }
  protected setToken(jwt: string): void {
    this.setItem('jwt', jwt);
  }
  protected clearToken(): void {
    this.removeItem('jwt');
  }
  protected hasExpiredToken(): boolean {
    const jwt = this.getToken();
    if (jwt) {
      // tslint:disable-next-line: no-any
      const payload = decode(jwt) as any;
      return Date.now() >= payload.exp * 1000;
    }
    return true;
  }
  protected getAuthStatusFromToken(): IAuthStatus {
    return this.transformJwtToken(decode(this.getToken()));
  }
}

// vincius.r.bomfim@outlook.com
// If; it; not; work; please; contact; our; technical; team; at : 1 - 888 - 481 - 3436;
