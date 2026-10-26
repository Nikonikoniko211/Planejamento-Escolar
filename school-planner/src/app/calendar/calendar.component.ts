import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Entry } from '../entry.service';

interface Day {
  date: Date;
  inMonth: boolean;
  isToday: boolean;
  entries: Entry[];
}

@Component({
  selector: 'app-calendar',
  imports: [DatePipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnChanges {
  @Input() entries: Entry[] = [];
  @Output() dayClicked = new EventEmitter<Date>();
  
  viewDate = new Date();
  weeks: Day[][] = [];
  weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  ngOnChanges() {
    this.build();
  }

  select(day: Day) {
    this.dayClicked.emit(day.date);
  }

  prev() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
    this.build();
  }

  next() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
    this.build();
  }

  goToday() {
    this.viewDate = new Date();
    this.build();
  }

  private key(d: Date): string {
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  }

  private build() {
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();

    // group entries by local calendar day
    const byDay = new Map<string, Entry[]>();
    for (const e of this.entries) {
      const k = this.key(new Date(e.date));
      byDay.set(k, [...(byDay.get(k) ?? []), e]);
    }

    // the grid starts on the Sunday on or before the 1st of the month
    const firstOfMonth = new Date(year, month, 1);
    const gridStart = new Date(year, month, 1 - firstOfMonth.getDay());
    const todayKey = this.key(new Date());

    this.weeks = [];
    for (let w = 0; w < 6; w++) {
      const week: Day[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + w * 7 + d);
        week.push({
          date,
          inMonth: date.getMonth() === month,
          isToday: this.key(date) === todayKey,
          entries: byDay.get(this.key(date)) ?? []
        });
      }
      this.weeks.push(week);
    }
  }
}