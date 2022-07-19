import { TestBed } from '@angular/core/testing';

import { FacadeGenericoService } from './facade-generico.service';

describe('FacadeGenericoService', () => {
  let service: FacadeGenericoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacadeGenericoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
