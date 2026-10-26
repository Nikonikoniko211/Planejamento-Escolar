import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { EntryService } from './entry.service';

describe('EntryService', () => {
  let service: EntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(EntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
