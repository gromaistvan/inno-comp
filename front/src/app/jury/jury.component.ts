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
        name: 'Evetovics Milán', email: 'evetovics.milan@balasys.hu', phone: '+36203655197',
        company: 'BalaSys',
        introduction: `
A ZMNE Bolyai János Katonai Műszaki Főiskolai Karán műszaki informatika szakon végzett.
A Magyar Honvédségnél eltöltött 13 éves hivatásos tiszti pályafutása alatt központi hálózati biztonsággal, végpont védelemmel, incidens kezeléssel,
valamint a központi szolgáltatások infrastruktúrájának tervezésével és üzemeltetésével foglalkozott.
Utána az AGCO multinacionális vállalatánál a központi szolgáltatások integrációjáért felelős csapat tagja volt.
2019-től a BalaSys csapat tagja, ahol rendszerintergrációs mérnökként tervezéssel és termékintegrációval foglalkozik.
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
