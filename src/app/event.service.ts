import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PageIDResponse } from "./results.model";
import { from, Observable } from 'rxjs';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }



  getPageIdForDate(date, month) {
    let monthName = monthNames[month];
    let URL = "api?action=query&titles=" + monthName + "%20" + date + "&format=json";
    return this.http.get(URL);
  }

  getEventBasedOnPageId(pageId) {
    // let URL = "api?action=parse&prop=text&section=1&preview=true&pageid=" + pageId + "&format=json";
    let URL = "api?action=parse&section=1&disablelimitreport=true&disableeditsection=true&disablestylededuplication=true&mobileformat=true&preview=false&pageid=" + pageId + "&format=json"
    return this.http.get(URL);

  }

}
