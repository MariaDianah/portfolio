import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosUfSelectComponent } from './estados-uf-select.component';

describe('EstadosUfSelectComponent', () => {
  let component: EstadosUfSelectComponent;
  let fixture: ComponentFixture<EstadosUfSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadosUfSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadosUfSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
