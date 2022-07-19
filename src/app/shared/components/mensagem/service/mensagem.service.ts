import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TipoMensagem } from '../models/tipo-mensagem.enum';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  private _mensagem: BehaviorSubject<string> = new BehaviorSubject<string>('');
  mensagem$ = this._mensagem.asObservable();

  private _tipoMensagem: BehaviorSubject<TipoMensagem> = new BehaviorSubject<TipoMensagem>(TipoMensagem.SUCESSO);
  tipoMensagem$ = this._tipoMensagem.asObservable();

  constructor() { }

  get mensagem(): string {
    return this._mensagem.getValue();
  }

  set mensagem(value: string) {
    this._mensagem.next(value);
  }

  get tipoMensagem(): TipoMensagem {
    return this._tipoMensagem.getValue();
  }

  set tipoMensagem(value: TipoMensagem) {
    this._tipoMensagem.next(value);
  }

  exibirMensagem(mensagem: string, tipoMensagem: TipoMensagem, tempo: number = 3): void {
    if (this.mensagem) {
      setTimeout(() => {
        this.exibirMensagem(mensagem, tipoMensagem, tempo);
      }, tempo * 1000);
    } else {
      this._mensagem.next(mensagem);
      this._tipoMensagem.next(tipoMensagem);
      setTimeout(() => {
        this._mensagem.next('');
      }, (tempo * 1000));
    }
  }

  exibirMensagemErro(err: any, mensagem: string = 'Ocorreu um erro ao realizar ação.', tempo: number = 3) {
    let msg: string = mensagem;
    if (err.error && err.error.message) msg = err.error.message;
    this.exibirMensagem(msg, TipoMensagem.ERRO, tempo);
  }

  exibirMensagemPermanente(mensagem: string, tipoMensagem: TipoMensagem): void {
    this._mensagem.next(mensagem);
    this._tipoMensagem.next(tipoMensagem);
  }
}
