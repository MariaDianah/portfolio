import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TipoMensagem } from '../../enums/tipo-mensagem.enum';

@Injectable({
  providedIn: 'root',
})
export class FacadeGenericoService {
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _msg: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _msgResPost: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private _tipoMsg: BehaviorSubject<TipoMensagem> =
    new BehaviorSubject<TipoMensagem>(TipoMensagem.PADRAO);

  loading$ = this._loading.asObservable();
  msg$ = this._msg.asObservable();
  msgResPost$ = this._msgResPost.asObservable();

  tipoMsg$ = this._tipoMsg.asObservable();

  constructor() {}

  get loading(): boolean {
    return this._loading.getValue();
  }

  set loading(value: boolean) {
    this._loading.next(value);
  }

  get msg(): string {
    return this._msg.getValue();
  }

  set msg(value: string) {
    this._msg.next(value);
  }

  get msgResPost(): string {
    return this._msgResPost.getValue();
  }

  set msgResPost(value: string) {
    this._msgResPost.next(value);
  }

  get tipoMsg(): TipoMensagem {
    return this._tipoMsg.getValue();
  }

  set tipoMsg(value: TipoMensagem) {
    this._tipoMsg.next(value);
  }

  limparObservables(): void {
    this.loading = false;
    this.msg = '';
    this.tipoMsg = TipoMensagem.PADRAO;
  }
}
