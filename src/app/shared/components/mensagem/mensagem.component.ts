import { Component, OnInit } from '@angular/core';
import { TipoMensagem } from './models/tipo-mensagem.enum';
import { MensagemService } from './service/mensagem.service';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.scss']
})
export class MensagemComponent implements OnInit {

  mensagem: string = '';
  tipoMensagem: TipoMensagem = TipoMensagem.SUCESSO;
  TipoMensagemEnum = TipoMensagem;
  animacaoAtiva: boolean = false;

  constructor(private _mensagemService: MensagemService) { }

  ngOnInit(): void {
    setTimeout(() => { this.animacaoAtiva = true }, 100);
    this._mensagemService.mensagem$.subscribe(mensagem => this.mensagem = mensagem);
    this._mensagemService.tipoMensagem$.subscribe(tipoMensagem => this.tipoMensagem = tipoMensagem);
  }

  fechar(): void {
    this._mensagemService.mensagem = '';
  }

}
