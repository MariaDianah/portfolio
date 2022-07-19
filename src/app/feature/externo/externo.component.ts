import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-externo',
  templateUrl: './externo.component.html',
  styleUrls: ['./externo.component.scss']
})
export class ExternoComponent implements OnInit {
  navegacaoFim: boolean = false;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.navegacaoFim = false;
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.navegacaoFim = true;
      }
    });
  }

}
