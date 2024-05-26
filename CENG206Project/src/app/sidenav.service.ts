import { ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }

  public isMobile = true;

  isCollapsed = true;
  toggleMenu() {
    if(this.isMobile) {
      //this.sidenav.toggle();
      this.isCollapsed = false;
    }else {
      //this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }

    //this.cdr.detectChanges();
  }

}
