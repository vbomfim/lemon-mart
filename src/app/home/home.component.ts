import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div *ngIf="(authService.authStatus$ | async)?.isAuthenticated; else doLogin">
      <div class="mat-display-4">
        This is LemonMart! The place where
      </div>
      <div class="mat-display-4">
        You get a lemon, you get a lemon, you get a lemon...
      </div>
      <div class="mat-display-4">
        Everybody gets a lemon.
      </div>
    </div>
    <ng-template #doLogin><app-login></app-login></ng-template>
  `,
  styles: [
    `
      div[fxLayout] {
        margin-top: 32px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  // displayLogin = true;
  // private subSink = new SubSink();
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    /*     this.subSink.sink = this.authService.authStatus$
      .pipe(
        tap((status: IAuthStatus) => {
          console.log(status);
          this.displayLogin = !status.isAuthenticated;
        })
      )
      .subscribe();
 */
  }

  ngOnDestroy(): void {
    // this.subSink.unsubscribe();
  }
}
