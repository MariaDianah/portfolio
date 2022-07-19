import { Component, EventEmitter,forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ContratoModeloDto } from 'src/app/shared/models/contratosModelo/contrato-modelo-dto';
import { ContratoModeloFiltro } from 'src/app/shared/models/contratosModelo/contrato-modelo-filtro';
import { ContratoModeloSelectService } from 'src/app/shared/services/contrato-modelo/contrato-modelo-select.service';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-contrato-modelo-select',
  templateUrl: './contrato-modelo-select.component.html',
  styleUrls: ['./contrato-modelo-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContratoModeloSelectComponent),
      multi: true
    }
  ]
})
export class ContratoModeloSelectComponent implements OnInit,  ControlValueAccessor, OnDestroy {

  uuidContratoModelo: any;
  onChange: any = () => { };
  onTouch: any = () => { };
  listaContratosModelo: ContratoModeloDto[] = [];
  sub: Subscription[] = [];
  page: number = 0;
  pageNome: number = 0;

  @Input() label: string = 'Contrato';
  @Input() readonly: boolean = false;
  @Input() notFoundText: string = 'Nenhum contrato modelo encontrado';
  @Input() multiple: boolean = false;
  @Input() obrigatorio: boolean = false;
  @Input() invalido: boolean = false;
  @Input() mostrarOpcaoTodos: boolean = false;

  @Output() change: EventEmitter<any> = new EventEmitter();

  private _termoDigitado: BehaviorSubject<string> = new BehaviorSubject<string>('');
  termoDigitado: string = '';

  constructor(private _contratoModeloFacadeService: ContratoModeloSelectService) { }

  ngOnInit(): void {
    this.buscarContratosModelo();
  }

  buscarContratosModelo(): void {
    const contratoNome: any = this.termoDigitado;
    console.log(contratoNome)
    console.log(this.termoDigitado)
    const filtro: ContratoModeloFiltro = { contratoNome, page: !!contratoNome ? this.pageNome : this.page };
    this.sub.push(
      this._contratoModeloFacadeService.contratoModelo$(filtro).subscribe(
        res => {
          if (res && res.length > 0) {
            if (contratoNome && this.page === 0) {
              this.listaContratosModelo = res;
            } else {
              this.atualizarLista(res);
            }
            if (contratoNome) {
              this.pageNome++;
            } else {
              this.pageNome = 0;
            }
          }
        },
        err => {
          console.log(err);
          this.pageNome = 0;
        }
      )
    );
  }

  limpar(): void {
    this._termoDigitado.next('');
  }

  onFocus(): void {
    this._termoDigitado.pipe(debounceTime(500)).subscribe(res => {
      if (this.termoDigitado !== res) {
        this.pageNome = 0;
        this.termoDigitado = res;
        this.buscarContratosModelo();
      }
    });
  }

  digitacao(event: any): void {
    this._termoDigitado.next(event.term.toLowerCase());
  }

  scrollToEnd(): void {
    this.page++;
    this.buscarContratosModelo();
  }

  atualizarLista(lista: ContratoModeloDto[]): void {
    lista.forEach(contratoModeloAInserir => {
      const banco = this.listaContratosModelo.find(contratosModeloalvo => {
        return contratosModeloalvo.contratoNome === contratoModeloAInserir.contratoNome;
      });
      if (!banco) this.listaContratosModelo.push(contratoModeloAInserir);
    });
  }

  buscarContratoModeloPorUUID(uuidContratoModelo: string): void {
    const filtro: ContratoModeloFiltro = { uuidContratoModelo };
    this.sub.push(
      this._contratoModeloFacadeService.contratoModelo$(filtro).subscribe(
        res => {
          if (res && res.length > 0) this.atualizarLista(res);
        },
        err => { }
      )
    );
  }

  writeValue(obj: any): void {
    this.uuidContratoModelo = obj;
    const contratoModelo: ContratoModeloDto | undefined = this.listaContratosModelo.find(el => el.uuidContratoModelo === this.uuidContratoModelo);
    if (!contratoModelo && this.uuidContratoModelo) this.buscarContratoModeloPorUUID(this.uuidContratoModelo);
    if (!this.uuidContratoModelo) this._termoDigitado.next('');
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
    this.sub.forEach(sub => sub.unsubscribe());
  }

}
 