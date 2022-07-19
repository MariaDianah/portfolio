import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.scss']
})
export class CaixaComponent implements OnInit {

  @Input() titulo: string = 'Título da caixa ausente';

  constructor() { }

  ngOnInit(): void {
  }

}
