import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadesSelectComponent } from './cidades-select.component';

describe('CidadesSelectComponent', () => {
  let component: CidadesSelectComponent;
  let fixture: ComponentFixture<CidadesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CidadesSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CidadesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
