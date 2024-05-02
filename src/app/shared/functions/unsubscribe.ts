import { Component, OnDestroy } from "@angular/core";
import { Subject, Subscription, takeUntil } from "rxjs";

@Component({
    template: ''
  })

export class UnsubscribeItem implements OnDestroy {

    subManger!: Subscription;
    unsubscribeSignal: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
  }

  public unsub(value1: any, value2: any): void {
    this. subManger = value1.pipe(takeUntil(this.unsubscribeSignal.asObservable())).value2
    console.log('Destruido!');
    
  }

}