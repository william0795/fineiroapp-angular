import { Component, Input,Output,EventEmitter }  from '@angular/core';
import { IChatBotComponent }       from './ichatbot.component';

@Component({
  template: `
    <p class="lexResponse">     
      {{data.message}}      
    </p>
  `
})
export class MessageResponseText implements IChatBotComponent {
  @Input() data: any;
  @Output() handlePushRequest: EventEmitter<any> = new EventEmitter();
  
}