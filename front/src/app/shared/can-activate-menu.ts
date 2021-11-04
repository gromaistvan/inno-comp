import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { dates } from './models';

@Injectable()
export class CanActivateMenu implements CanActivate {

  test(path: string): boolean {
    const now = new Date();
    switch (path) {
      case 'signup':
        return now <= dates.signup;
      case 'schedule':
      case 'jury':
        return now > dates.signup;
      case 'recordings':
        return now > dates.presentation;
      default:
        return true;
    }
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree {
    return this.test(route.url[0].path);
  }
}
