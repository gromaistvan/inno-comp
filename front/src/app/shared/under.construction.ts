import { OnInit } from '@angular/core';
import { Message } from 'primeng/api';

export class UnderConstruction implements OnInit {
  messages: Message[];

  ngOnInit(): void {
    this.messages = [{
      severity: 'warn',
      summary: 'Hamarosan!',
      detail: 'Amit elérhetővé válnak a szükséges információk, itt megtalálod.',
    } as Message];
  }
}
