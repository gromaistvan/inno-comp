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
        name: 'Tóth Veronika', email: 'veronika.toth@enet.hu', phone: '+36209391919',
        company: 'eNET',
        introduction: 'Tóth Veronika a eNET Internetkutató és Tanácsadó Kft. vezető informatikai tanácsadója.',
      });
    this.jury.push(
      {
        name: 'Király Anna', email: 'akiraly@npsh.hu', phone: '+36306570015',
        company: 'NPSH',
        introduction: 'Király Anna a Novell Professzionális Szolgáltatások Magyarország Kft-nél az integrációs és fejlesztési területek vezetője.',
      });
    this.jury.push(
      {
        name: 'Mélykuti Balázs', email: '', phone: '+36209666569',
        company: 'Qualysoft',
        introduction: 'Dr. Mélykuti Balázs a Qualysoft Holding informatikai cégcsoport nemzetközi üzletfejlesztésért felelős vezetője.'
      });
    return;
    this.jury.push(
      {
        name: 'Lovas Szabolcs', email: 'lovass.szabolcs@gmail.com', phone: '+36204644349',
        company: '',
        introduction: 'Lovas Szabolcs immár 7 éves szenior informatikai tanácsadói tapasztalattal rendelkezik.'
      });
    this.jury.push(
      {
        name: 'Hanzlik Zsuzsa', email: 'hanzlik.zsuzsa@gmail.com', phone: '+36308608009',
        company: 'Ericsson',
        introduction: 'Hanzlik Zsuzsa az Ericsson R&D-nél csoport coaching és release menedzsment területekkel foglalkozik.'
      });
  }
}
