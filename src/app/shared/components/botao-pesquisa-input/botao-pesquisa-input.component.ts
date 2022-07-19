import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-botao-pesquisa-input',
  templateUrl: './botao-pesquisa-input.component.html',
  styleUrls: ['./botao-pesquisa-input.component.scss']
})
export class BotaoPesquisaInputComponent implements OnInit {

  @Input() title: string = '';
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
