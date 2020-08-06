import { TestBed, async } from '@angular/core/testing';
import { MediaObserver } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { MediaObserverFake, commonTestingProviders } from './common/common.testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: commonTestingProviders.concat([
        { provide: MediaObserver, useClass: MediaObserverFake },
      ]),
      declarations: [AppComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'lemon-mart'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('lemon-mart');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain(
  //     'lemon-mart app is running!'
  //   );
  // });
});
