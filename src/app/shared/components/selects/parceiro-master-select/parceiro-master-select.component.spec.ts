import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParceiroMasterSelectComponent } from './parceiro-master-select.component';

describe('ParceiroMasterSelectComponent', () => {
  let component: ParceiroMasterSelectComponent;
  let fixture: ComponentFixture<ParceiroMasterSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParceiroMasterSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParceiroMasterSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
