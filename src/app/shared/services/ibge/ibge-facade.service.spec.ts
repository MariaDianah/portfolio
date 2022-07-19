import { TestBed } from '@angular/core/testing';

import { IbgeFacadeService } from './ibge-facade.service';

describe('IbgeFacadeService', () => {
  let service: IbgeFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IbgeFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
