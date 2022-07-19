import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apresentacao',
  templateUrl: './apresentacao.component.html',
  styleUrls: ['./apresentacao.component.scss']
})
export class ApresentacaoComponent implements OnInit, OnDestroy {
  @ViewChild('caixa') caixa?: ElementRef<HTMLElement>;

  constructor() { }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}
