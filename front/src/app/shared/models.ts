export interface Applicant {
  name: string;
  email: string;
  title: string;
  company: string;
  phone?: string;
}

export interface Company {
  name: string;
  ceo: string;
}

export interface Jury {
  name: string;
  email: string;
  phone?: string;
  company: string;
  introduction: string;
}

export function loadCompanies(): Company[] {
  return [
    { name: 'E-Educatio Információtechnológia Zrt.', ceo: 'Dr. Szőcs Károly' },
    { name: 'eKRÉTA Informatikai Zrt.', ceo: 'Dr. Szabó Balázs' },
    { name: 'ELMS Informatikai Zrt.', ceo: 'Fehér István' },
    { name: 'LMS One Informatikai Zrt.', ceo: 'Csapó Attila' },
    { name: 'Max & Future Kft.', ceo: 'Zikkert Antal' },
    { name: 'Rufusz Computer Informatika Zrt.', ceo: 'Fauszt András' },
    { name: 'SDA DMS Zrt.', ceo: 'Bencze György' },
    { name: 'SDA Informatika Zrt.', ceo: 'Szabó Zoltán' },
    { name: 'Webjogsi KMR Autósiskola Zrt.', ceo: 'Dr. Szőcs Károly' },
  ];
}
