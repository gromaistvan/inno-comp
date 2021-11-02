import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CanActivateMenu implements CanActivate {
  private readonly signup: Date = new Date(2021, 11, 30);
  private readonly recordings: Date = new Date(2021, 12, 13);

  test(path: string): boolean {
    switch (path) {
      case 'signup': return new Date() <= this.signup;
      case 'recordings': return new Date() > this.recordings;
      default: return true;
    }
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree {
    return this.test(route.url[0].path);
  }
}
