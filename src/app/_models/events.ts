import { Component, OnInit} from '@angular/core';

export class Events{
    start: string; // Kezdeti ido
    end: string; // Vege
    summary: string; // Esemeny Neve
    location: string; // Helyszin
    type: string;

    constructor(start:string, end:string, summary:string, location:string, type: string){
        this.start = start;
        this.end = end;
        this.location = location;
        this.summary = summary;
        this.type = type;
    }
}