import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CanActivateMenu } from './shared/can-activate-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private canActivateMenu: CanActivateMenu) {
  }

  createItem(label: string, icon: string, url: string): MenuItem {
    return { label, icon: 'pi ' + icon, routerLink: ['/' + url], disabled: ! this.canActivateMenu.test(url) };
  }

  ngOnInit() {
    this.items = [
      this.createItem('Tudnivalók', 'pi-info', 'info'),
      this.createItem('Regisztráció', 'pi-user-plus', 'signup'),
      this.createItem('Pályázók', 'pi-users', 'applicants'),
      this.createItem('Zsűri', 'pi-eye', 'jury'),
      this.createItem('Időbeosztás', 'pi-calendar', 'schedule'),
      this.createItem('Beszámolók', 'pi-video', 'recordings'),
    ];
  }
}
