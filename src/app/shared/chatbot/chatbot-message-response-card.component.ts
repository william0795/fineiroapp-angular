import { Component, Input,Output,OnInit,ViewChild ,EventEmitter }  from '@angular/core';
import { IChatBotComponent }       from './ichatbot.component';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
  template: `
<ngb-carousel #carousel [showNavigationIndicators]="false"  class="lexResponseCard"  >
    <ng-template ngbSlide *ngFor="let lexCard of data.responseCard.genericAttachments;let idx=index">    
        <div class="card" style="width: 28rem;border:0px;">
            <img  *ngIf = "lexCard.imageUrl" class="card-img-top" [src]="lexCard.imageUrl" alt="">
            <div class="card-body">
                <h5 class="card-title">{{lexCard.title}}</h5>
                <p class="card-text">{{lexCard.subTitle}}</p>
            </div>
            <ul class="list-group list-group-flush text-center"  *ngFor="let button of lexCard.buttons;let idx1=index">                
                <button (click)="pushRequest(button.value)"  class="btn btn-outline-primary  cardButton"> {{button.text}} </button>                
            </ul>            
        </div>  
    </ng-template>  
</ngb-carousel>
`
})
export class MessageResponseCard implements OnInit,IChatBotComponent {
  @Input() data: any;
  @Input() handlePushRequest: any;
  
  
  

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  ngOnInit(): void {
console.log("MessageResponseCard -> data", this.data)
console.log("MessageResponseCard -> handlePushRequest", this.handlePushRequest)
this.carousel.pause();

  }


  pushRequest(value:string){    
    this.handlePushRequest(value)  
  }  
  
}