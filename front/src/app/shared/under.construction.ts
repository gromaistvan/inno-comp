import { Message } from 'primeng/api';

export class UnderConstruction {
  message: Message[] = [{ severity:'warn', summary: 'Hamarosan!', detail: 'Amit elérhetővé válnak a szükséges információk, itt megtalálod.', sticky: true , closable: false }];
}
