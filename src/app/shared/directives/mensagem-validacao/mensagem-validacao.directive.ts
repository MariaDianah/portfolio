import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appMensagemValidacao]',
})
export class MensagemValidacaoDirective {
  temCaixaErro: boolean = false;
  jaFoiDesfocado: boolean = false;

  @Input() campoForm?: AbstractControl;
  @Input() mensagem: string = '';

  @HostBinding('style.border-color') borderColor = '#FFFFFF';

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {}

  @HostListener('blur', ['$event'])
  onBlur() {
    this.verificarValidade();
    this.jaFoiDesfocado = true;
  }

  @HostListener('keyup', ['$event'])
  onKeyup() {
    if (this.jaFoiDesfocado) this.verificarValidade();
  }

  verificarValidade(): void {
    if (this.campoForm && this.campoForm.invalid) {
      this.borderColor = '#BD1E1E';
      if (!this.temCaixaErro && this.mensagem) {
        const span = this._renderer.createElement('span');
        span.innerHTML = this.mensagem;
        this._renderer.addClass(span, 'erro');
        const pai = this._elementRef.nativeElement.parentElement;
        this._renderer.appendChild(pai, span);
        this.temCaixaErro = true;
      }
    } else {
      this.borderColor = '#FFFFFF';
      const elementos: HTMLCollection =
        this._elementRef.nativeElement.parentElement.children;
      for (let i = 0; i < elementos.length; i++) {
        if (elementos.item(i)?.className.includes('erro')) {
          this._renderer.removeChild(
            this._elementRef.nativeElement.parentElement,
            elementos.item(i)
          );
        }
      }
      this.temCaixaErro = false;
    }
  }
}
