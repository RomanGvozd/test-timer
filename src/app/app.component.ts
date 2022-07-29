import { Component } from '@angular/core';
import { Subject, interval } from "rxjs";
import { map, debounceTime, buffer, filter } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
  title = 'my-timer';

  running: boolean = false;

  min: number = 0;
  sec: number = 0;

  interval$ = interval(1000);

  stop$ = new Subject();
  start$ = new Subject();
  wait$ = new Subject();
  reset$ = new Subject();
  
  subscription: any;

  constructor() {

    this.start$.subscribe(() => {
      this.running = true;
      this.subscription = this.interval$.subscribe((this.addSecond.bind(this)));
    })

    this.stop$.subscribe(() => {
      this.running = false
      this.subscription.unsubscribe()
      this.sec = 0
      this.min = 0
    })

    this.reset$.subscribe(() => {
      this.sec = 0
      this.min = 0
    })

    this.wait$
      .asObservable()
      .pipe(buffer(this.wait$.pipe(debounceTime(200))))
      .pipe(map((click) => click.length))
      .pipe(filter((click) => click === 2))
      .subscribe(() => {
        this.running = false
        this.subscription.unsubscribe(this.addSecond)
      })
  }

  addSecond(): void {
    this.sec++
    if (this.sec === 60) {
      this.min++
      this.sec = 0
    }
  }
}
