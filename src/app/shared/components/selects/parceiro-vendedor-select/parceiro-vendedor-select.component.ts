import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TipoUsuario } from 'src/app/shared/enums/tipo-usuario';
import { UsuarioDto } from 'src/app/shared/models/usuarios/interface-usuario-dto';
import { UsuarioFiltro } from 'src/app/shared/models/usuarios/interface-usuario-filtro';
import { UsuariosSelectService } from 'src/app/shared/services/usuarios/usuarios-select.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-parceiro-vendedor-select',
  templateUrl: './parceiro-vendedor-select.component.html',
  styleUrls: ['./parceiro-vendedor-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ParceiroVendedorSelectComponent),
      multi: true
    }
  ]
})
export class ParceiroVendedorSelectComponent implements OnInit, ControlValueAccessor, OnDestroy {

  usuarioEmail: any;
  onChange: any = () => { };
  onTouch: any = () => { };
  listaVendedores: UsuarioDto[] = [];
  sub: Subscription[] = [];
  page: number = 0;
  pageNome: number = 0;

  @Input() label: string = 'Vendedor';
  @Input() readonly: boolean = false;
  @Input() notFoundText: string = 'Nenhum vendedor encontrado';
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
    const tipoUsuario= TipoUsuario.PARCEIRO_VENDEDOR;
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

  buscarVendedorPorEmail(email: string): void {
    const filtro: UsuarioFiltro = { email };
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
    this.usuarioEmail = obj;
    const usuario: UsuarioDto | undefined = this.listaVendedores.find(el => el.usuarioEmail === this.usuarioEmail);
    if (!usuario && this.usuarioEmail) this.buscarVendedorPorEmail(this.usuarioEmail);
    if (!this.usuarioEmail) this._termoDigitado.next('');
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
