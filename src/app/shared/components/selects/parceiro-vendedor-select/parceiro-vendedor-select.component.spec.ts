import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParceiroVendedorSelectComponent } from './parceiro-vendedor-select.component';

describe('ParceiroVendedorSelectComponent', () => {
  let component: ParceiroVendedorSelectComponent;
  let fixture: ComponentFixture<ParceiroVendedorSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParceiroVendedorSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParceiroVendedorSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
