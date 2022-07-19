import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  animacaoAtiva: boolean = false;

  @Output() fundoClicado: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    // espera um tempo para adicionar classe para qua a animação do modal funcione somente com css
    setTimeout(() => {
      this.animacaoAtiva = true;
    }, 100);
  }

  // remove a classe de animação ao destruir modal
  ngOnDestroy(): void {
    this.animacaoAtiva = false;
  }

  // emite um evento ao clicar no fundo do modal verificando a div pelo id: modal-fundo
  emitirClickFundo(event: any): void {
    if (event.path[0].id === 'modal-fundo') {
      this.fundoClicado.emit();
    };
  }

}
