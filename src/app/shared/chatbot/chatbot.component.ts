import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  ComponentFactoryResolver,
  ViewContainerRef,
} from "@angular/core";

// import { Subscription, Observable, timer } from "rxjs";
// import * as moment from "moment";
// import { AuthService } from "src/app/services/auth.service";

// import aws SDK
import * as LexRuntime from "aws-sdk/clients/lexruntime";
import {AWSError} from "aws-sdk/global";

import { IChatBotComponent } from "./ichatbot.component";
import { ChatBotDirective } from "./chatbot.directive";
import { ChatBotService } from "./chatbot.service";
import { MessageRequestText } from "./chatbot-message-request-text.component";
import { MessageResponseCard } from "./chatbot-message-response-card.component";
import { MessageResponseText } from "./chatbot-message-response-text.component";
import { MessageResponseError } from "./chatbot-message-response-error.component";
import { BotMessage } from "./chatbot.messages";

/**********************************************/
@Component({
  selector: "app-chatbot",
  templateUrl: "./chatbot.component.html",
  styleUrls: ["./chatbot.component.css"],
})

/**********************************************/
export class ChatbotComponent implements OnInit, OnChanges, OnDestroy {
  /*****************Variables*****************************/
  @ViewChild("chatText") chatText: ElementRef;  
  @ViewChild("chatbotHost", { read: ViewContainerRef })
  chatHost: ViewContainerRef;

  //lexruntime = new LexRuntime();
  //lexUserId = "phantomxChatbot-" + Date.now();
  //sessionAttributes = {};

  @Input() public show: boolean = false;
  @Input() public cssClassHeight:string= 'cardChatHeight90';
  @Output() public closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  //alt:string;
  /*******************constructor***************************/
  constructor(    
    private chaBotService: ChatBotService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { 
    //this.alt=this.cssClassHeight;
  }

  /*******************ngOnInit*************************/
  ngOnInit(): void {}
  ngOnDestroy() {}
  ngOnChanges(changes: SimpleChanges) {
    console.log("chatBot - ngOnChanges", changes);
  }

  pushChatBot(event: KeyboardEvent) {
    if (event.key === "Enter") {
      // if there is text to be sent...
      if (
        this.chatText &&
        this.chatText.nativeElement.value &&
        this.chatText.nativeElement.value.trim().length > 0
      ) {
        var message = this.chatText.nativeElement.value.trim();
        this.chatText.nativeElement.value = "...";
        this.chatText.nativeElement.locked = true;

        // send it to the Lex runtime
        this.chaBotService.pushChat(
          message,
          this.handleMessageRequest,
          this.handleMessageResponse
        );
      }
    }
  }

  handlePushChatBot = (message: string) => {
    //console.log("handlePushChatBot", message)

    this.chaBotService.pushChat(
      message,
      this.handleMessageRequest,
      this.handleMessageResponse
    );
  };

  handleMessageRequest = (message: any): void => {
    const messageRequest = new BotMessage(MessageRequestText, {message: message});
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(messageRequest.component);
    const componentRef = this.chatHost.createComponent(componentFactory);
    (<IChatBotComponent>componentRef.instance).data = messageRequest.data;

    this.chatText.nativeElement.value = "";
    this.chatText.nativeElement.locked = false;
    this.conversationScrollTop();
  };

  handleMessageResponse = (
    err: AWSError,
    data: LexRuntime.PostTextResponse
  ) => {
    console.log("handleMessageResponse -> data -> ", data);

    if (err) {
      console.log(err, err.stack);
      this.handleMessageResponseError(
        "Error:  " + err.message + " (see console for details)"
      );
    }

    if (data.message) {
     this.addMessageResponseText(data);
    }

    if (data.dialogState === "ReadyForFulfillment") {
      //responsePara.appendChild(document.createTextNode("Ready for fulfillment"));
      console.log("Ready for fulfillment");
      // TODO:  show slot values
    } else {
      //responsePara.appendChild(document.createTextNode('(' + lexResponse.dialogState + ')'));
    }

    if (data.dialogState === "ElicitSlot") {
      if (data.responseCard) {        
        this.addMessageResponseCard(data)
      }
    }

    this.conversationScrollTop();
  };

  handleMessageResponseError = (message: string) => {
    console.log("handleMessageResponseError", message);
  };

  addMessageResponseText(data: LexRuntime.PostTextResponse){

    const messageResponse = new BotMessage(MessageResponseText, {message: data.message});
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(messageResponse.component);

    const componentRef = this.chatHost.createComponent(componentFactory);
    (<IChatBotComponent>componentRef.instance).data = messageResponse.data;
    this.conversationScrollTop();
  }

  addMessageResponseCard(data: LexRuntime.PostTextResponse){
    const messageResponse = new BotMessage(MessageResponseCard, {message: data.message});
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(messageResponse.component);
    const componentRef = this.chatHost.createComponent(componentFactory);
    
    let componentInstance = <IChatBotComponent>componentRef.instance;
    componentInstance.data = data;
    componentInstance.handlePushRequest = this.handlePushChatBot;
    this.conversationScrollTop();
  }

  conversationScrollTop = () => {
    var conversationDiv = document.getElementById("conversation");
    // console.log("conversationScrollTop -> conversationDiv -> ",conversationDiv)   

    conversationDiv.scrollTop = conversationDiv.scrollHeight;
    

    // console.log("conversationScrollTop -> conversationDiv -> conversationDiv.scrollHeight ",conversationDiv.scrollHeight)
    // console.log("conversationScrollTop -> conversationDiv -> conversationDiv.scrollTop ",conversationDiv.scrollTop)
  };

   

  showChat() {
    console.log("showChat");
    this.show = true;
  }

  closeChat() {
    console.log("closeChat");
    this.show = false;
    this.closed.next(this.show);
  }
}
