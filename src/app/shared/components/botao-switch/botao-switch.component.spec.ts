import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoSwitchComponent } from './botao-switch.component';

describe('BotaoSwitchComponent', () => {
  let component: BotaoSwitchComponent;
  let fixture: ComponentFixture<BotaoSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotaoSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotaoSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
