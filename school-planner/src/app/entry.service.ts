import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type EntryType = 'Test' | 'Assignment' | 'Event' | 'DayOff';

export const ENTRY_TYPE_LABELS: Record<EntryType, string> = {
  Test: 'Prova',
  Assignment: 'Trabalho',
  Event: 'Evento',
  DayOff: 'Dia livre'
};

export interface Entry {
  id?: string;
  title: string;
  type: EntryType;
  date: string;
  subject?: string | null;
  isDone: boolean;
  notes?: string | null;
}

@Injectable({ providedIn: 'root' })
export class EntryService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5288/entries';

  getEntries(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.baseUrl);
  }

  addEntry(entry: Entry): Observable<Entry> {
    return this.http.post<Entry>(this.baseUrl, entry);
  }

  updateEntry(entry: Entry): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${entry.id}`, entry);
  }

  deleteEntry(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}