import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[chatbotHost]',
})

export class ChatBotDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}