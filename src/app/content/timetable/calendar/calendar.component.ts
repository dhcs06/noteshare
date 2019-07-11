// import * as moment from 'moment';
import localeHu from '@angular/common/locales/hu';
import { Location, registerLocaleData } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, DAYS_OF_WEEK } from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';
import { Observable } from 'rxjs';
import { ILesson } from '../../../_models/lesson';
import { Events } from '../../../_models/events';

import { UsersService } from 'src/app/_services/users.service';
import { CalendarService } from '../../../_services/calendar.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  green: {
    primary: '#009900',
    secondary: '#4CB74C'

  }
};

registerLocaleData(localeHu);

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  name = 'Órarend / Vizsgák';
  public locale = 'hu';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SUNDAY, DAYS_OF_WEEK.SATURDAY];

  view: string = 'month';
  viewDate: Date = new Date();
  events$: Observable<Array<CalendarEvent<{ event: Events }>>>;
  activeDayIsOpen: boolean = false;
  hasLesson: boolean = false;
  form: any = {};
  date:string;
  displayColor: any = {};

  constructor(
    private http: HttpClient,
    private userService: UsersService,
    private calendarService: CalendarService
    ) { }

    actualUser = this.userService.currentUser;
    url = `api/lesson/${this.actualUser}?_format=json`;
    lesson: ILesson;

    ngOnInit(): void {
      this.fetchEvents();
  }

  fetchEvents(): void {
    this.calendarService.getLesson(this.actualUser).subscribe(
      lesson => {
        this.lesson = lesson;
        this.hasLesson = true;

        this.lesson.events.forEach(element => {
          this.displayColor = '';
        });

      const getStart: any = {
        month: startOfMonth,
        week: startOfWeek,
        day: startOfDay
      }[this.view];

      const getEnd: any = {
        month: endOfMonth,
        week: endOfWeek,
        day: endOfDay
      }[this.view];

      const params = new HttpParams()
        .set(
          'start',
          format(getStart(this.viewDate, { weekStartsOn: 1 }), 'YYYY.MM.DD')
        )
        .set(
          'end',
          format(getEnd(this.viewDate, { weekStartsOn: 1 }), 'YYYY.MM.DD')
        );
      
        if(this.actualUser != ''){
          this.events$ = this.http
          .get(this.url, { params })
          .pipe(
            map(({ events }: { events: Events[] }) => {
              return events.map((event: Events) => {
                if(event.type === "Óra"){
                  this.displayColor = colors.yellow;
                } else if(event.type === "Felvett vizsga"){
                  this.displayColor = colors.red;
                } else if(event.type === "Felvehető vizsga"){
                  this.displayColor = colors.blue;
                } else {
                  this.displayColor = colors.green;
                }
                return {
                  title: event.summary + "  -  " + event.start + "  -  " + event.location,
                  start: new Date(event.start),
                  end: new Date(event.end),
                  color: this.displayColor,
                  meta: {
                    event
                  }
                };
              });
            })
          );
        }
      },
      error => {
        if(error.status == 404){
          this.hasLesson = false;
        }
      } 
    )
  }
  dayClicked({
    date,
    events
  }: {
      date: Date;
      events: Array<CalendarEvent<{ event: Events }>>;
    }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

sDate: any = {};
eDate: any = {};
messages: Events[] = [];

  updateEvents(){
    this.sDate = this.form.startDate.replace('T',' ');
    this.sDate = this.sDate.replace(/-/gi,'.');
    this.eDate = this.form.endDate.replace('T',' ');
    this.eDate = this.eDate.replace(/-/gi,'.');

    this.messages.push(new Events(this.sDate, this.eDate, this.form.eventsName, this.form.eventsLocation, "Egyéb"));
  
    const newevents: ILesson = {
      username: this.actualUser,
      events: this.messages
    };
    if(this.actualUser != ''){
      this.calendarService.updateEvents(newevents, this.actualUser).subscribe(
        _ =>{ 
          console.log("sikeres update");
        }
      );
    }
    console.log(newevents);
  }
}
