import { Component, Input, OnChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Entry } from '../entry.service';

interface Item {
  entry: Entry;
  diff: number;
  label: string;
}

@Component({
  selector: 'app-upcoming',
  imports: [DatePipe],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css'
})
export class UpcomingComponent implements OnChanges {
  @Input() entries: Entry[] = [];
  @Input() days = 7;

  overdue: Item[] = [];
  upcoming: Item[] = [];

  ngOnChanges() {
    const today = this.startOfDay(new Date());

    const items: Item[] = this.entries
      .filter(e => !e.isDone)
      .map(e => {
        const diff = this.daysBetween(today, new Date(e.date));
        return { entry: e, diff, label: this.label(diff) };
      })
      .sort((a, b) => a.diff - b.diff);

    this.overdue = items.filter(i => i.diff < 0 && i.entry.type === 'Assignment');
    this.upcoming = items.filter(i => i.diff >= 0 && i.diff <= this.days);
  }

  private startOfDay(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  private daysBetween(from: Date, to: Date): number {
    const ms = this.startOfDay(to).getTime() - from.getTime();
    return Math.round(ms / 86_400_000);
  }

  private label(diff: number): string {
    if (diff < 0) {
      const days = -diff;
      return `${days} ${days === 1 ? 'dia' : 'dias'} em atraso`;
    }
    if (diff === 0) return 'Hoje';
    if (diff === 1) return 'Amanhã';
    return `em ${diff} dias`;
  }
}