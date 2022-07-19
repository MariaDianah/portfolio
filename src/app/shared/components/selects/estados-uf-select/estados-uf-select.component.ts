import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UF } from '../../../models/ibge/uf';
import { IbgeFacadeService } from '../../../services/ibge/ibge-facade.service';

@Component({
  selector: 'app-estados-uf-select',
  templateUrl: './estados-uf-select.component.html',
  styleUrls: ['./estados-uf-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EstadosUfSelectComponent),
      multi: true
    }
  ]
})
export class EstadosUfSelectComponent implements OnInit, ControlValueAccessor, OnDestroy {

  uf: any;
  onChange: any = () => { };
  onTouch: any = () => { };
  listaEstados: UF[] = [];
  sub: Subscription = new Subscription();

  @Input() label: string = 'Estado';
  @Input() readonly: boolean = false;
  @Input() notFoundText: string = 'Nenhum estado encontrado';
  @Input() multiple: boolean = false;
  @Input() obrigatorio: boolean = false;
  @Input() invalido: boolean = false;

  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor(private _ibgeFacadeService: IbgeFacadeService) { }

  ngOnInit(): void {
    this.buscarEstados();
  }

  buscarEstados() {
    this.sub = this._ibgeFacadeService.buscarEstados().subscribe(
      res => {
        this.listaEstados = res;
      }
    );
  }

  writeValue(obj: any): void {
    this.uf = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  emitChange(event: any): void {
    this.onChange(event);
    this.change.emit(event);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }



}
