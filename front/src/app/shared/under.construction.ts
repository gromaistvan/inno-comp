import { OnInit } from '@angular/core';
import { Message } from 'primeng/api';

export class UnderConstruction implements OnInit {
  messages: Message[];

  protected sendError(message: string): void {
    this.messages = [{
      severity: 'error',
      summary: 'Hiba történt',
      detail: message || '🎃 Általános hiba!'
    } as Message, ...(this.messages || [])];
  }

  ngOnInit(): void {
    this.messages = [{
      severity: 'warn',
      summary: 'Hamarosan!',
      detail: 'Amit elérhetővé válnak a szükséges információk, itt megtalálod.',
    } as Message];
  }
}
