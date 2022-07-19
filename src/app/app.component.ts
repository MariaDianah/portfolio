import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MensagemService } from './shared/components/mensagem/service/mensagem.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';
  mensagem$?: Observable<string>;

  constructor(private _mensagemService: MensagemService) {
    this.mensagem$ = this._mensagemService.mensagem$;
  }
}
