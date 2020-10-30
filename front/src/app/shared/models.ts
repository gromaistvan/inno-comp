export interface Company {
  name: string;
  ceo: string;
}

export interface Applicant {
  name: string;
  email: string;
  title: string;
  company: Company;
  phone?: string;
}

export function loadCompanies(): Company[] {
  return [
    { name: 'E-Educatio Információtechnológia Zrt.', ceo: 'Dr. Szőcs Károly' },
    { name: 'eKRÉTA Informatikai Zrt.', ceo: 'Dr. Szabó Balázs' },
    { name: 'ELMS Informatikai Zrt.', ceo: 'Fehér István' },
    { name: 'Max & Future Kft.', ceo: 'Zikkert Antal' },
    { name: 'Rufusz Computer Informatika Zrt.', ceo: 'Fauszt András' },
    { name: 'SDA DMS Zrt.', ceo: 'Bencze György' },
    { name: 'SDA Informatika Zrt.', ceo: 'Szabó Zoltán' },
    { name: 'Webjogsi KMR Autósiskola Zrt.', ceo: 'Dr. Szőcs Károly' },
  ];
}
