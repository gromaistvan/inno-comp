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
        name: 'Hanzlik Zsuzsanna', email: 'hanzlik.zsuzsa@gmail.com', phone: '+36308608009',
        company: 'Ericsson',
        introduction: `
Diplomáját az ELTÉ-n szerezte programtervező matematikus szakon. Rendszerszervezőként dolgozott a Főpolgármesteri Hivatal Informatikai Ügyosztályán.
Jelenleg az Ericsson világcégnél release menedzsment területen dolgozik.
Mindamellett, hogy szívügye az innováció, szervezetfejlesztési- és vállalati coachként is tevékenykedik.
`.trim(),
      },
      {
        name: 'Evetovics Milán', email: 'evetovics.milan@balasys.hu',
        company: 'BalaSys',
        introduction: `
Feltöltés alatt...
`.trim(),
      },
      {
        name: 'Mocsáry András', email: '', phone: '+36204280198',
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
