import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MensagemService } from '../../components/mensagem/service/mensagem.service';
import { UF } from '../../models/ibge/uf';
import { Estados } from '../../utils/estado-cidade/estados-cidades';
import { IbgeService } from './ibge.service';

@Injectable({
  providedIn: 'root'
})
export class IbgeFacadeService {

  estados = Estados;
  cidades: string[] = [];
  estadosDoJson: boolean = false;

  private _listaEstados: BehaviorSubject<UF[]> = new BehaviorSubject<UF[]>([]);
  listaEstados$ = this._listaEstados.asObservable();

  constructor(private _ibgeService: IbgeService, private _mensagemService: MensagemService) { }

  get listaEstados(): UF[] {
    return this._listaEstados.getValue();
  }

  set listaEstados(value: UF[]) {
    this._listaEstados.next(value);
  }

  buscarEstados(): Observable<UF[]> {
    if (!this.listaEstados || this.listaEstados.length === 0) {
      const sub: Subscription = this._ibgeService.buscarEstados().subscribe(
        res => {
          this.listaEstados = res;
          this.estadosDoJson = false;
        },
        err => {
          this.salvarEstadosJson();
        }
      );
      setTimeout(() => {
        if (!this.listaEstados || this.listaEstados.length === 0) {
          this.salvarEstadosJson();
          sub.unsubscribe();
        }
      }, 3000);

    }
    return this.listaEstados$;
  }

  salvarEstadosJson() {
    this.estadosDoJson = true;
    const estados = this.estados.map(estado => {
      return { nome: estado.nome, sigla: estado.sigla }
    });
    this.listaEstados = estados;
  }

  buscarMunicipioPorEstado(uf: string, callback?: Function) {
    if (this.estadosDoJson) {
      this.salvarCidadesJson(uf);
      if (!!callback) callback(this.cidades);
    } else {
      const sub: Subscription = this._ibgeService.buscarMunicipioPorEstado(uf).subscribe(
        res => {
          this.cidades = res.map(el => el.nome);
          if (!!callback) callback(this.cidades);
        },
        err => {
          this.salvarCidadesJson(uf);
          if (!!callback) callback(this.cidades);
        }
      );
      setTimeout(() => {
        if (!this.cidades || this.cidades.length === 0) {
          sub.unsubscribe();
          this.salvarCidadesJson(uf);
          if (!!callback) callback(this.cidades);
        }
      }, 3000);
    }
  }

  salvarCidadesJson(uf: string) {
    this.estados.forEach(es => {
      if (es.sigla === uf) {
        this.cidades = es.cidades;
      } 
    });
  }



}
