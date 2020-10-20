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
    this.items = [
      { label: 'Tudnivalók', icon: 'pi pi-info', routerLink: ['/info'] },
      { label: 'Regisztráció', icon: 'pi pi-user-plus', routerLink: ['/signup'] },
      { label: 'Menetrend', icon: 'pi pi-calendar', routerLink: ['/schedule'] },
      { label: 'Pályázók', icon: 'pi pi-users', routerLink: ['/applicant'] },
      { label: 'Zsűri', icon: 'pi pi-eye', routerLink: ['/jury'] },
      { label: 'Beszámolók', icon: 'pi pi-video', routerLink: ['/recording'] }
    ];
  }
}
