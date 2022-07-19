import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PaginacaoEvento } from '../../models/paginacao/paginacao-evento';


@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.scss']
})
export class PaginacaoComponent implements OnInit, OnChanges {

  totalPaginas: number = 0;
  @Input() indicePagina: number = 0;
  @Input() tamanhoPagina: number = 0;
  @Input() quantidadeItens: number = 0;
  @Input() itensPorPagina: number[] = [5, 10, 25, 50, 100];
  @Output() paginacao: EventEmitter<PaginacaoEvento> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.contadorPaginas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.contadorPaginas();
  }

  contadorPaginas() {
    this.totalPaginas = Math.ceil(this.quantidadeItens / this.tamanhoPagina);
  }

  proximaPagina() {
    this.indicePagina++;
    this.emitirEventoPaginacao();
  }

  paginaAnterior() {
    this.indicePagina--;
    this.emitirEventoPaginacao();
  }

  primariaPagina() {
    this.indicePagina = 0;
    this.emitirEventoPaginacao();
  }

  ultimaPagina() {
    this.indicePagina = this.totalPaginas - 1;
    this.emitirEventoPaginacao();
  }

  selectItensPagina() {
    this.indicePagina = 0;
    this.contadorPaginas();
    this.emitirEventoPaginacao();
  }

  selecionarPagina(pagina: number) {
    this.indicePagina = pagina;
    this.emitirEventoPaginacao();
  }

  emitirEventoPaginacao() {
    const pagina: PaginacaoEvento = {
      indicePagina: this.indicePagina,
      tamanhoPagina: this.tamanhoPagina
    };
    this.paginacao.emit(pagina);
  }

}
