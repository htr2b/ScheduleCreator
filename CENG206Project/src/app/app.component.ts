import { Component, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'OBS';

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;

  constructor(private observer: BreakpointObserver, ) {}

  ngOnInit(){
    // Make side navigation responsive
    var condition = '(max-width: 800px)';
    this.observer.observe([condition]).subscribe((screenSize) => {
      var breakPoints = screenSize.breakpoints;
      this.isMobile = breakPoints[condition];}
  )};

  isCollapsed = true;
  toggleMenu() {
    if(this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    }else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
