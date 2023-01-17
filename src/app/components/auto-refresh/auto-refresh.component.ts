import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import * as moment from 'moment';
@Component({
selector: 'kt-auto-refresh',
templateUrl: './auto-refresh.component.html',
styleUrls: ['./auto-refresh.component.css']
})
export class AutoRefreshComponent implements OnInit {

private subscription: Subscription;

@Output() TimerExpired: EventEmitter<any> = new EventEmitter<any>();
@Input() SearchDate: moment.Moment = moment();
@Input() ElapsTime: number;
@Input() Reset: boolean;
searchEndDate: moment.Moment;
remainingTime: number;
minutes: number;
seconds: number;
everySecond: Observable<number> = timer(0, 1000);
constructor(private ref: ChangeDetectorRef) {

this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");

}

ngOnInit() {


  this.contador();
}
contador(){
  this.subscription = this.everySecond.subscribe((seconds) => {
    var currentTime: moment.Moment = moment();
    this.remainingTime = this.searchEndDate.diff(currentTime)
    this.remainingTime = this.remainingTime / 1000;
    // console.log('remainingTime',this.remainingTime);
    // console.log('searchEndDate',this.searchEndDate);
    console.log("Reset refresh",this.Reset);
    console.log("Validacion",(this.remainingTime <= 0 || this.Reset==true));


    if (this.remainingTime <= 0 || this.Reset==true) {
      // console.log("Reset refresh",this.Reset);
    this.SearchDate = moment();
    this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
    this.Reset=false;
    this.TimerExpired.emit();
    console.log("Reiniciar");

    }
    else {
    this.minutes = Math.floor(this.remainingTime / 60);
    this.seconds = Math.floor(this.remainingTime - this.minutes * 60);
            }
    this.ref.markForCheck()
  })
}
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
}
