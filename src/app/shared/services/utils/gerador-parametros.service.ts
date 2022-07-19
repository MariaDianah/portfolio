import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeradorParametrosService {
  constructor() { }

  public gerarParams(filtro: any): HttpParams {
    let params: HttpParams = new HttpParams();

    Object.keys(filtro).forEach((campo) => {
      if (!!filtro[campo] || filtro[campo] === 0) {
        params = this.gerarParamsIndividual(campo, filtro[campo], params);
      }
      if (filtro[campo] === false) {
        params = this.gerarParamsIndividual(campo, 'false', params);
      }
    });

    return params;
  }

  private gerarParamsIndividual(
    nomeParametro: string,
    valorParametro: string,
    httpParams: HttpParams
  ): HttpParams {
    if (Array.isArray(valorParametro)) {
      valorParametro.forEach((valor) => {
        httpParams = httpParams.append(nomeParametro, valor);
      });
    } else {
      httpParams = httpParams.append(nomeParametro, valorParametro);
    }

    return httpParams;
  }
}
