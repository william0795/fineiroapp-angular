import { Injectable } from '@angular/core';
// import aws SDK
import * as LexRuntime from "aws-sdk/clients/lexruntime";
import {Config as AWSConfig, CognitoIdentityCredentials} from "aws-sdk/global";


@Injectable()
export class ChatBotService {
    lexruntime = new LexRuntime();
  lexUserId = "phantomxChatbot-" + Date.now();
  sessionAttributes = {};

  constructor() {
    const AWSConfigConstructor = AWSConfig;
    const CognitoConstructor = CognitoIdentityCredentials;

    const credentials = new CognitoConstructor(
      { IdentityPoolId: "us-east-1:09a8bd55-cb2e-467b-8725-0a333a177994" },
      { region: "us-east-1" }
    );
    const awsConfig = new AWSConfigConstructor({region: "us-east-1",credentials});

    //const LexRuntimeConstructor = LexRuntime;
    this.lexruntime = new LexRuntime(awsConfig);
  }


    pushChat(message:any, handleRequest : any, handleResponse: any){

        // send it to the Lex runtime
        var params = {
            botAlias: "$LATEST",
            botName: "PhantomxSecurity",
            inputText: message,
            userId: this.lexUserId,
            sessionAttributes: this.sessionAttributes,
          };

          handleRequest(message);

          this.lexruntime.postText(params, handleResponse);

    }
}