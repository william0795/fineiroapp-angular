import { Type } from '@angular/core';

export class BotMessage {
  constructor(public component: Type<any>, public data: any) {}
}