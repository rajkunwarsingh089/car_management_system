import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class Guard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = true; //TODO: Implement token on which based need to stop user
    if (token) {
      return true;
    }
    this.router.navigate(['']); // TODO: Need to implement the route that by default which screen will get shown.
    return false;
  }
}