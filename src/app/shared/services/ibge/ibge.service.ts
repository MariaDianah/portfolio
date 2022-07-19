import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Municipio } from '../../models/ibge/municipio';
import { UF } from '../../models/ibge/uf';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {

  url = 'https://servicodados.ibge.gov.br/api/v1';

  constructor(
    private _http: HttpClient
  ) { }

  buscarEstados(): Observable<UF[]> {
    return this._http.get<UF[]>(`${this.url}/localidades/estados`).pipe(
      map(res => {
        return res.sort((a, b) => {
          return (a.nome > b.nome) ? 1 : ((a.nome < b.nome) ? -1 : 0);
        });
      })
    );
  }

  buscarMunicipioPorEstado(uf: string): Observable<Municipio[]> {
    return this._http.get<Municipio[]>(`${this.url}/localidades/estados/${uf}/municipios`).pipe(
      map(res => {
        return res.sort((a, b) => {
          return (a.nome > b.nome) ? 1 : ((a.nome < b.nome) ? -1 : 0);
        });
      })
    );
  }
}
