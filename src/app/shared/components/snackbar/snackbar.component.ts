import { Component, OnInit } from '@angular/core';
import { SnackBarModel } from './models/snackbar-model';
import { SnackbarService } from './services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  snackbarModel: SnackBarModel[] = [];
  titulo: string = 'notificação intelecto';
  mensagem: string = 'Olá Mundo! Esta é uma mensagem de brinde.';
  constructor(private _snackService: SnackbarService) {}

  ngOnInit(): void {
    this._snackService.snackbars$.subscribe((res) => {
      this.snackbarModel = res;
    });
  }

  removerCaixa(hash: number): void {
    this._snackService.removerCaixaSnack(hash);
  }
}
