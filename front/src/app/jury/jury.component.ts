import { Component, OnInit } from '@angular/core';
import { Jury } from '../shared/models';
import { UnderConstruction } from '../shared/under.construction';

@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html',
  styleUrls: ['./jury.component.css']
})
export class JuryComponent extends UnderConstruction implements OnInit {
  readonly jury: Jury[];

  constructor() {
    super();
    this.jury = [
      {
        name: 'Hanzlik Zsuzsa', email: 'hanzlik.zsuzsa@gmail.com', phone: '+36308608009',
        company: 'Ericsson',
        introduction: `
Feltöltés alatt...
`.trim(),
      },
      {
        name: 'Evetovics Milán', email: 'evetovics.milan@balasys.hu', phone: '+36203655197',
        company: 'BalaSys',
        introduction: `
Feltöltés alatt...
`.trim(),
      },
      {
        name: 'Mocsáry András', email: 'andras.mocsary@codecool.com', phone: '+36204280198',
        company: 'Codecool',
        introduction: `
Feltöltés alatt...
`.trim(),
      },
    ];
  }

  ngOnInit(): void {
  }
}
