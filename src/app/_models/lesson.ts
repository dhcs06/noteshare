import {Events } from './events';
import { Observable } from 'rxjs';
import { CalendarEvent, DAYS_OF_WEEK } from 'angular-calendar';

export class ILesson {
    username: string;
    events: Events[] = [];
}