export interface Company {
  name: string;
  ceo?: string;
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
