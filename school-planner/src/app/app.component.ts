import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Entry, EntryService, EntryType } from './entry.service';
import { CalendarComponent } from './calendar/calendar.component';
import { UpcomingComponent } from './upcoming/upcoming.component';

@Component({
  selector: 'app-root',
  imports: [DatePipe, FormsModule, CalendarComponent, UpcomingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private entryService = inject(EntryService);

  entries: Entry[] = [];
  types: EntryType[] = ['Test', 'Assignment', 'Event', 'DayOff'];
  newEntry: Entry = this.blankEntry();
  today = new Date();

  @ViewChild('titleInput') titleInput?: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.load();
  }

  load() {
    this.entryService.getEntries().subscribe(data => this.entries = data);
  }

  add() {
    if (!this.newEntry.title.trim() || !this.newEntry.date) return;

    const entry: Entry = {
      ...this.newEntry,
      date: this.newEntry.date + 'T00:00:00',
      subject: this.newEntry.subject || null
    };

    this.entryService.addEntry(entry).subscribe(() => {
      this.newEntry = this.blankEntry();
      this.load();
    });
  }

  toggleDone(entry: Entry) {
    this.entryService.updateEntry({ ...entry, isDone: !entry.isDone })
      .subscribe(() => this.load());
  }

  pickDay(date: Date) {
    const pad = (n: number) => String(n).padStart(2, '0');
    this.newEntry.date = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    this.titleInput?.nativeElement.focus();
  }

  remove(entry: Entry) {
    if (!entry.id) return;
    this.entryService.deleteEntry(entry.id).subscribe(() => this.load());
  }

  private blankEntry(): Entry {
    return { title: '', type: 'Test', date: '', subject: '', isDone: false };
  }
}