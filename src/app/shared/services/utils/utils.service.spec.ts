import { TestBed } from '@angular/core/testing';

import { GeradorParametrosService } from './gerador-parametros.service';

describe('UtilsService', () => {
  let service: GeradorParametrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeradorParametrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
