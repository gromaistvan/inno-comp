import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inno-comp';
  items: MenuItem[];
  constructor() {
    this.items = [{
      label: 'Tudnivalók',
      icon: 'pi pi-apple',
      routerLink: ['/info']
    }, {
      label: 'Regisztráció',
      icon: 'pi pi-apple',
      routerLink: ['/reg']
    }];
  }
}
