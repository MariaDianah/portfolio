import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoPesquisaInputComponent } from './botao-pesquisa-input.component';

describe('BotaoPesquisaInputComponent', () => {
  let component: BotaoPesquisaInputComponent;
  let fixture: ComponentFixture<BotaoPesquisaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotaoPesquisaInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotaoPesquisaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
