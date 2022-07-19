import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  tamanhoDiv: string = '';
  tamanhoBola: string = '';
  margem: string = ''
  @Input() tamanho: number = 32;
  @Input() cor: 'escuro' | 'claro' | 'white' = 'escuro';

  constructor() { }

  ngOnInit(): void {
    this.tamanhoDiv = `${this.tamanho}px`;
    this.tamanhoBola = `${this.tamanho / 4}px`;
    this.margem = `-${this.tamanho / 8}px`;
    
  }



}
