import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ClienteDto } from 'src/app/shared/models/clientes/interface-cliente-dto';
import { ClienteFiltro } from 'src/app/shared/models/clientes/interface-cliente-filtro';
import { ClientesSelectService } from 'src/app/shared/services/clientes/clientes-select.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-clientes-select',
  templateUrl: './clientes-select.component.html',
  styleUrls: ['./clientes-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClientesSelectComponent),
      multi: true
    }
  ]
})
export class ClientesSelectComponent implements OnInit, ControlValueAccessor, OnDestroy {

  cpf: any;
  onChange: any = () => { };
  onTouch: any = () => { };
  listaClientes: ClienteDto[] = [];
  sub: Subscription[] = [];
  page: number = 0;
  pageNome: number = 0;

  @Input() label: string = 'Cliente';
  @Input() readonly: boolean = false;
  @Input() notFoundText: string = 'Nenhum cliente encontrado';
  @Input() multiple: boolean = false;
  @Input() obrigatorio: boolean = false;
  @Input() invalido: boolean = false;
  @Input() mostrarOpcaoTodos: boolean = false;

  @Output() change: EventEmitter<any> = new EventEmitter();

  private _termoDigitado: BehaviorSubject<string> = new BehaviorSubject<string>('');
  termoDigitado: string = '';

  constructor(private _clienteFacadeService: ClientesSelectService) { }

  ngOnInit(): void {
    this.buscarClientes();
  }

  buscarClientes(): void {
    const clienteNome: any = this.termoDigitado;
    const filtro: ClienteFiltro = { clienteNome, page: !!clienteNome ? this.pageNome : this.page };
    this.sub.push(
      this._clienteFacadeService.clientes$(filtro).subscribe(
        res => {
          if (res && res.length > 0) {
            if (clienteNome && this.page === 0) {
              this.listaClientes = res;
            } else {
              this.atualizarLista(res);
            }
            if (clienteNome) {
              this.pageNome++;
            } else {
              this.pageNome = 0;
            }
          }
        },
        err => {
          this.pageNome = 0;
        }
      )
    );
  }

  buscarClientePorCpf(cpf: string): void {
    const filtro: ClienteFiltro = { cpf };
    this.sub.push(
      this._clienteFacadeService.clientes$(filtro).subscribe(
        res => {
          if (res && res.length > 0) this.atualizarLista(res);
        },
        err => { }
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
        this.buscarClientes();
      }
    });
  }

  digitacao(event: any): void {
    this._termoDigitado.next(event.term.toLowerCase());
  }

  scrollToEnd(): void {
    this.page++;
    this.buscarClientes();
  }

  atualizarLista(lista: ClienteDto[]): void {
    lista.forEach(clienteAInserir => {
      const banco = this.listaClientes.find(clienteSalvo => {
        return clienteSalvo.cpf === clienteAInserir.cpf;
      });
      if (!banco) this.listaClientes.push(clienteAInserir);
    });
  }

  writeValue(obj: any): void {
    this.cpf = obj;
    const cliente: ClienteDto | undefined = this.listaClientes.find(el => el.cpf === this.cpf);
    if (!cliente && this.cpf) this.buscarClientePorCpf(this.cpf);
    if (!this.cpf) this._termoDigitado.next('');
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
