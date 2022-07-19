import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SnackBarModel } from '../models/snackbar-model';

@Injectable()
export class SnackbarService {
  constructor() {}

  private _snackbars: BehaviorSubject<SnackBarModel[]> = new BehaviorSubject<
    SnackBarModel[]
  >([]);
  public snackbars$: Observable<SnackBarModel[]> =
    this._snackbars.asObservable();

  get snackBar$(): Observable<SnackBarModel[]> {
    return this.snackBar$;
  }

  private get snackbar(): SnackBarModel[] {
    return this._snackbars.getValue();
  }

  private set snackbar(value: SnackBarModel[]) {
    this._snackbars.next(value);
  }

  mostrarMensagem(
    mensagem: string,
    titulo?: string,
    tempoEmMilissegundos?: number
  ): void {
    let hashAtual: number = this._gerarHash();
    this.snackbar.push({
      mensagem,
      titulo,
      tempoEmMilissegundos,
      hash: hashAtual,
    });

    if (this.snackbar.length > 3) {
      this.snackbar.shift();
    }
    this._removerSnackBarComTempo(hashAtual, tempoEmMilissegundos);

    return;
  }

  removerCaixaSnack(hashSnack: number): void {
    this._removerSnackBarComTempo(hashSnack, 0);
  }

  private _removerSnackBarComTempo(hash: number, milissegundos?: number): void {
    setTimeout(() => {
      this.snackbar = this.snackbar.filter((snack) => snack.hash !== hash);
    }, milissegundos ?? 10000);
  }

  private _gerarHash(): number {
    return Math.floor(Math.random() * Date.now()) + Date.now();
  }
}
