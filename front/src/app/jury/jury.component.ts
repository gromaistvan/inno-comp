import { Component } from '@angular/core';
import { Jury } from '../shared/models';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html',
  styleUrls: ['./jury.component.css']
})
export class JuryComponent {
  readonly jury: Jury[] = [];

  constructor() {
    this.jury.push(
    {
      name: 'Tóth Veronika', email: 'toth.ver@gmail.com', phone: '+36209391919',
      company: 'eNET',
      introduction: `A eNET Internetkutató és Tanácsadó Kft. vezető informatikai tanácsadója.`,
    });
    if (environment.production) return;
    this.jury.push(
    {
      name: 'Hanzlik Zsuzsa', email: 'hanzlik.zsuzsa@gmail.com', phone: '+36308608009',
      company: 'Ericsson',
      introduction: `Az Ericsson R&D-nél csoport coaching és release menedzsment területekkel foglalkozik.`
    });
    this.jury.push(
    {
      name: 'Király Anna', email: 'akiraly@npsh.hu', phone: '+36306570015',
      company: 'NPSH',
      introduction: `Novell Professzionális Szolgáltatások Magyarország Kft-nél az integrációs és fejlesztési területek vezetője.`,
    });
  }
}
