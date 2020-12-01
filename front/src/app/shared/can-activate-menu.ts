import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CanActivateMenu implements CanActivate {
  private readonly signup: Date = new Date(2020, 11, 1);
  private readonly recordings: Date = new Date(2020, 11, 14);

  test(path: string): boolean {
    switch (path) {
      case 'signup': return new Date() < this.signup;
      case 'recordings': return new Date() > this.recordings;
      default: return true;
    }
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree {
    return this.test(route.url[0].path);
  }
}
