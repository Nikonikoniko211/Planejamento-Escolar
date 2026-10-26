import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { EntryService } from './entry.service';

describe('AppComponent', () => {
  const entryService = jasmine.createSpyObj('EntryService', ['getEntries', 'addEntry', 'updateEntry', 'deleteEntry']);

  beforeEach(async () => {
    entryService.getEntries.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: EntryService, useValue: entryService }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render Portuguese application content', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Planejamento Escolar');
    expect(compiled.textContent).toContain('Nova atividade');
    expect(compiled.textContent).toContain('Todas as atividades');
  });
});
