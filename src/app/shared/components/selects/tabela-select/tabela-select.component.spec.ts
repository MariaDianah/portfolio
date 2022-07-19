import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaSelectComponent } from './tabela-select.component';

describe('TabelaSelectComponent', () => {
  let component: TabelaSelectComponent;
  let fixture: ComponentFixture<TabelaSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
