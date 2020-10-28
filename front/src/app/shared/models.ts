export interface Company {
  name: string;
  ceo: string;
  logo: string;
}

export interface Applicant {
  name: string;
  email: string;
  title: string;
  company: Company;
  abstract: string;
  presentation: string;
  phone?: string;
}

export function loadCompanies(): Company[] {
  return [
    { name: 'E-Educatio Információtechnológia Zrt.', ceo: 'Dr. Szőcs Károly', logo: '/assest/educatio.png' },
    { name: 'eKRÉTA Informatikai Zrt.', ceo: 'Dr. Szabó Balázs', logo: '/assest/ekreta.png' },
    { name: 'ELMS Informatikai Zrt.', ceo: 'Fehér István', logo: '/assest/elms.png' },
    { name: 'Max & Future Kft.', ceo: 'Zikkert Antal', logo: '/assest/max.png' },
    { name: 'Rufusz Computer Informatika Zrt.', ceo: 'Fauszt András', logo: '/assest/rufusz.png' },
    { name: 'SDA DMS Zrt.', ceo: 'Bencze György', logo: '/assest/sdadms.png' },
    { name: 'SDA Informatika Zrt.', ceo: 'Szabó Zoltán', logo: '/assest/sda.png' },
    { name: 'Webjogsi KMR Autósiskola Zrt.', ceo: 'Dr. Szőcs Károly', logo: '/assest/webjogsi.png' },
  ];
}
