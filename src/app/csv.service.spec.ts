import { TestBed } from '@angular/core/testing';

import { CSVService } from './csv.service';

describe('CSVService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CSVService = TestBed.get(CSVService);
    expect(service).toBeTruthy();
  });
});
