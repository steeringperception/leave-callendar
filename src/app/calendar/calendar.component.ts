import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currMonth: Date = new Date();
  lastDateOfMonth = 0;
  dateArray: Date[] = [];

  snapData: any[] = [];

  employeeLeaves: any[] = [];

  snapView: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCurrMonth();
    this.http
      .get(
        `https://api.jsonbin.io/b/616bba55aa02be1d445a84c1?date=${this.currMonth.toISOString()}`
      )
      .subscribe((res: any) => {
        this.employeeLeaves = res.employeeLeaves || [];
        this.snapData = res.snapData || [];
      });
  }

  getCurrMonth() {
    this.currMonth = new Date(this.currMonth.setDate(1));
    this.getLasDateOfMonth();
  }
  getNextMonth() {
    this.currMonth = new Date(
      this.currMonth.setMonth(this.currMonth.getMonth() + 1)
    );
    this.getLasDateOfMonth();
  }
  getPrevMonth() {
    this.currMonth = new Date(
      this.currMonth.setMonth(this.currMonth.getMonth() - 1)
    );
    this.getLasDateOfMonth();
  }
  getLasDateOfMonth() {
    let lastDay = new Date(
      this.currMonth.getFullYear(),
      this.currMonth.getMonth() + 1,
      0
    );
    this.lastDateOfMonth = lastDay.getDate();
    this.dateArray = [];
    for (let i = 1; i <= this.lastDateOfMonth; i++) {
      this.dateArray.push(
        new Date(this.currMonth.getFullYear(), this.currMonth.getMonth(), i)
      );
    }
  }
}
