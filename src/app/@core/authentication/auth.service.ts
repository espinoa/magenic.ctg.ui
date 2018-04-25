import { Injectable, Injector } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthService {

  private hasStorage: boolean;
  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(
  ) {
    this.hasStorage = typeof Storage !== 'undefined';
  }

  /**
   * Stores the URL so we can redirect after signing in.
   */
  public getRedirectUrl(): string {
    if (this.hasStorage) {
      return localStorage.getItem('redirectUrl');
    }
    return null;
  }

  public setRedirectUrl(url: string): void {
    if (this.hasStorage) {
      localStorage.setItem('redirectUrl', url);
    }
  }

  public removeRedirectUrl(): void {
    localStorage.removeItem('redirectUrl');
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

}
