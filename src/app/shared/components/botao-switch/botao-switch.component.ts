import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-botao-switch',
  templateUrl: './botao-switch.component.html',
  styleUrls: ['./botao-switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BotaoSwitchComponent),
      multi: true
    }
  ]
})
export class BotaoSwitchComponent implements OnInit, ControlValueAccessor {

  @Input() label: string = '';

  valor: boolean = false;
  onChange: any = () => { };
  OnTouch: any = () => { };

  constructor() { }

  ngOnInit(): void {
  }

  writeValue(obj: any): void {
    this.valor = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.OnTouch = fn;
  }

  alterarValor(novoValor: boolean): void {
    this.valor = novoValor;
    this.onChange(novoValor);
  }

}
