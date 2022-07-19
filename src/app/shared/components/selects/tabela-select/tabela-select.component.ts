import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TabelaDto } from 'src/app/shared/models/tabelas/interface-tabela-dto';
import { TabelaFiltro } from 'src/app/shared/models/tabelas/interface-tabela-filtro';
import { TabelaSelectService } from 'src/app/shared/services/tabelas/tabela-select.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-tabela-select',
  templateUrl: './tabela-select.component.html',
  styleUrls: ['./tabela-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TabelaSelectComponent),
      multi: true
    }
  ]
})
export class TabelaSelectComponent implements OnInit, ControlValueAccessor, OnDestroy {

  nomeTabela: any;
  onChange: any = () => { };
  onTouch: any = () => { };
  listaTabelas: TabelaDto[] = [];
  sub: Subscription[] = [];
  page: number = 0;
  pageNome: number = 0;

  @Input() label: string = 'Tabela';
  @Input() readonly: boolean = false;
  @Input() notFoundText: string = 'Nenhuma tabela encontrada';
  @Input() multiple: boolean = false;
  @Input() obrigatorio: boolean = false;
  @Input() invalido: boolean = false;
  @Input() mostrarOpcaoTodos: boolean = false;

  @Output() change: EventEmitter<any> = new EventEmitter();

  private _termoDigitado: BehaviorSubject<string> = new BehaviorSubject<string>('');
  termoDigitado: string = '';

  constructor(private _tabelaFacadeService: TabelaSelectService) { }

  ngOnInit(): void {
    this.buscarTabelas();
  }

  buscarTabelas(): void {
    const nomeTabela: any = this.termoDigitado;
    const filtro: TabelaFiltro = { nomeTabela, page: !!nomeTabela ? this.pageNome : this.page };
    this.sub.push(
      this._tabelaFacadeService.tabelas$(filtro).subscribe(
        res => {
          if (res && res.length > 0) {
            if (nomeTabela && this.page === 0) {
              this.listaTabelas = res;
            } else {
              this.atualizarLista(res);
            }
            if (nomeTabela) {
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

  buscarTabelaPorNome(nomeTabela: string): void {
    const filtro: TabelaFiltro = { nomeTabela };
    this.sub.push(
      this._tabelaFacadeService.tabelas$(filtro).subscribe(
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
        this.buscarTabelas();
      }
    });
  }

  digitacao(event: any): void {
    this._termoDigitado.next(event.term.toLowerCase());
  }

  scrollToEnd(): void {
    this.page++;
    this.buscarTabelas();
  }

  atualizarLista(lista: TabelaDto[]): void {
    lista.forEach(usuarioAInserir => {
      const banco = this.listaTabelas.find(UsuarioSalvo => {
        return UsuarioSalvo.nomeTabela === usuarioAInserir.nomeTabela;
      });
      if (!banco) this.listaTabelas.push(usuarioAInserir);
    });
  }

  writeValue(obj: any): void {
    this.nomeTabela = obj;
    const usuario: TabelaDto | undefined = this.listaTabelas.find(el => el.nomeTabela === this.nomeTabela);
    if (!usuario && this.nomeTabela) this.buscarTabelaPorNome(this.nomeTabela);
    if (!this.nomeTabela) this._termoDigitado.next('');
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
