import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.scss']
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  voltar(): void {
    this._location.back();
  }

}
