import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TipoUsuario } from 'src/app/shared/enums/tipo-usuario';
import { UsuarioDto } from 'src/app/shared/models/usuarios/interface-usuario-dto';
import { UsuarioFiltro } from 'src/app/shared/models/usuarios/interface-usuario-filtro';
import { UsuariosSelectService } from 'src/app/shared/services/usuarios/usuarios-select.service';

@Component({
  selector: 'app-parceiro-master-select',
  templateUrl: './parceiro-master-select.component.html',
  styleUrls: ['./parceiro-master-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ParceiroMasterSelectComponent),
      multi: true
    }
  ]
})
export class ParceiroMasterSelectComponent implements OnInit, ControlValueAccessor, OnDestroy {

  cpf: any;
  onChange: any = () => { };
  onTouch: any = () => { };
  listaVendedores: UsuarioDto[] = [];
  sub: Subscription[] = [];
  page: number = 0;
  pageNome: number = 0;

  @Input() label: string = 'Parceiro';
  @Input() readonly: boolean = false;
  @Input() notFoundText: string = 'Nenhum parceiro encontrado';
  @Input() multiple: boolean = false;
  @Input() obrigatorio: boolean = false;
  @Input() invalido: boolean = false;
  @Input() mostrarOpcaoTodos: boolean = false;

  @Output() change: EventEmitter<any> = new EventEmitter();

  private _termoDigitado: BehaviorSubject<string> = new BehaviorSubject<string>('');
  termoDigitado: string = '';

  constructor(private _usuarioFacadeService: UsuariosSelectService) { }

  ngOnInit(): void {
    this.buscarVendedores();
  }

  buscarVendedores(): void {
    const tipoUsuario= TipoUsuario.PARCEIRO_MASTER;
    const nome: any = this.termoDigitado;
    const filtro: UsuarioFiltro = { tipoUsuario, nome, page: !!nome ? this.pageNome : this.page };
    this.sub.push(
      this._usuarioFacadeService.usuarios$(filtro).subscribe(
        res => {
          if (res && res.length > 0) {
            if (nome && this.page === 0) {
              this.listaVendedores = res;
            } else {
              this.atualizarLista(res);
            }
            if (nome) {
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

  buscarVendedorPorCpf(cpf: string): void {
    const filtro: UsuarioFiltro = { cpf };
    this.sub.push(
      this._usuarioFacadeService.usuarios$(filtro).subscribe(
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
        this.buscarVendedores();
      }
    });
  }

  digitacao(event: any): void {
    this._termoDigitado.next(event.term.toLowerCase());
  }

  scrollToEnd(): void {
    this.page++;
    this.buscarVendedores();
  }

  atualizarLista(lista: UsuarioDto[]): void {
    lista.forEach(usuarioAInserir => {
      const banco = this.listaVendedores.find(UsuarioSalvo => {
        return UsuarioSalvo.cpf === usuarioAInserir.cpf;
      });
      if (!banco) this.listaVendedores.push(usuarioAInserir);
    });
  }

  writeValue(obj: any): void {
    this.cpf = obj;
    const usuario: UsuarioDto | undefined = this.listaVendedores.find(el => el.cpf === this.cpf);
    if (!usuario && this.cpf) this.buscarVendedorPorCpf(this.cpf);
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
