import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-botao-menu',
  templateUrl: './botao-menu.component.html',
  styleUrls: ['./botao-menu.component.scss']
})
export class BotaoMenuComponent implements OnInit, AfterViewInit {

  menuDrop: boolean = false;
  quantidadeItens: number = 1;

  @ViewChild('botoes') botoes?: ElementRef<HTMLElement>;

  constructor(private _elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.verificarQuantidadeItens();
  }

  verificarQuantidadeItens(): void {
    const elementos: HTMLCollection | undefined = this.botoes?.nativeElement.children;
    if (elementos && elementos.length > 0) {
      let contador: number = 0;
      for (let i = 0; i < elementos.length; i++) {
        if (elementos.item(i)?.tagName === 'BUTTON') {
          contador++;
        };
      }
      this.quantidadeItens = this.quantidadeItens + contador;
    }
  }

  // verifica a altura baseada na quantidade de opções disponiveis no menu para definir a propriedade max-heigth
  verificarAltura(): string {
    return `${(this.quantidadeItens * 36)}px`;
  }

  // verifica o local do click, se for fora no menu o dropdown é fechado
  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent): void {
    if (!this._elementRef.nativeElement.contains(event.target) && this.menuDrop) {
      this.menuDrop = false;
    }
  }

}
