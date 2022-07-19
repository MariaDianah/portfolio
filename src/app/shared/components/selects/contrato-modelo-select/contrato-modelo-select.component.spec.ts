import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoModeloSelectComponent } from './contrato-modelo-select.component';

describe('ContratoModeloSelectComponent', () => {
  let component: ContratoModeloSelectComponent;
  let fixture: ComponentFixture<ContratoModeloSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratoModeloSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoModeloSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
