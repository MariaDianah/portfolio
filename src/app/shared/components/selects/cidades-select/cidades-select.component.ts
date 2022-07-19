import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IbgeFacadeService } from '../../../services/ibge/ibge-facade.service';

@Component({
  selector: 'app-cidades-select',
  templateUrl: './cidades-select.component.html',
  styleUrls: ['./cidades-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CidadesSelectComponent),
      multi: true
    }
  ]
})
export class CidadesSelectComponent implements OnInit, ControlValueAccessor, OnChanges {

  cidade: any;
  onChange: any = () => { };
  onTouch: any = () => { };
  listaCidades: string[] = [];

  @Input() uf: string | null = null;
  @Input() label: string = 'Cidade';
  @Input() readonly: boolean = false;
  @Input() notFoundText: string = 'Nenhuma cidade encontrada';
  @Input() multiple: boolean = false;
  @Input() obrigatorio: boolean = false;
  @Input() invalido: boolean = false;

  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor(private _ibgeFacadeService: IbgeFacadeService) { }

  ngOnInit(): void { }

  buscarCidades(): void {
    if (this.uf) {
      this._ibgeFacadeService.buscarMunicipioPorEstado(this.uf,
        (res: string[]) => {
          if (res && res.length > 0) this.listaCidades = res;
        },
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.uf) {
      this.buscarCidades();
      this.listaCidades = [];
    }
  }

  writeValue(obj: any): void {
    this.cidade = obj;
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

}
