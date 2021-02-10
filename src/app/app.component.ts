import { Component, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { EventService } from "./event.service";
import { EventsResponse, PageIDResponse } from './results.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'onthisday';
  pageId: string;

  keyValue;
  currentMonth: number;
  today: Date;
  currentDate: Date;
  eventData;
  eventHTML: SafeHtml;
  constructor(private service: EventService, private parser: DomSanitizer) {

    this.today = new Date();
    this.currentDate = new Date(
      2020,
      this.today.getMonth(),
      this.today.getDate()
    );
    this.getEvent();

  }

  getEvent() {
    this.service.getPageIdForDate(this.currentDate.getDate(), this.currentDate.getMonth()).subscribe(
      (res: PageIDResponse) => {
        let result = (res.query.pages);
        console.log(Object.keys(result)[0]);
        this.pageId = Object.keys(result)[0];
        this.service.getEventBasedOnPageId(this.pageId).subscribe((res: EventsResponse) => {
          console.log(res);
          this.eventData = res.parse.text["*"];
          // this.eventHTML = this.parser.bypassSecurityTrustHtml(this.eventData);
          // console.log(this.eventHTML);
          // var doc = this.parser.parseFromString(this.eventData);

        });
      });;

  }


  onKeyDown(event) {
    this.keyValue = event.key;
    this.currentMonth = this.currentDate.getMonth();
    if (event.key == "ArrowUp") {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        this.currentDate.getDate() - 1
      );
    } else if (event.key == "ArrowDown") {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        this.currentDate.getDate() + 1
      );
    } else if (event.key == "ArrowLeft") {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        this.currentDate.getDate()
      );
    } else if (event.key == "ArrowRight") {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        this.currentDate.getDate()
      );
    }
    this.getEvent();
  }

  checkCurrentDate(dt: Date): boolean {
    if (
      this.currentDate.getDate() == dt.getDate() &&
      this.currentDate.getMonth() == dt.getMonth()
    ) {
      return true;
    }
    return false;
  }
}
