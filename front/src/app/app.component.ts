import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: MenuItem[];

  ngOnInit() {
    this.items = [
      { label: 'Tudnivalók', icon: 'pi pi-info', routerLink: ['/info'] },
      { label: 'Regisztráció', icon: 'pi pi-user-plus', routerLink: ['/signup'] },
      { label: 'Pályázók', icon: 'pi pi-users', routerLink: ['/applicants'] },
      { label: 'Zsűri', icon: 'pi pi-eye', routerLink: ['/jury'] },
      { label: 'Időbeosztás', icon: 'pi pi-calendar', routerLink: ['/schedule'] },
      { label: 'Beszámolók', icon: 'pi pi-video', routerLink: ['/recordings'] }
    ];
  }
}
