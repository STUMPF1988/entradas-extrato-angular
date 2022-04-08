import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TransferenciaService } from '../services/transferencia.service';

@Component({
  selector: 'app-nova-transferencia',
  templateUrl: './nova-transferencia.component.html',
  styleUrls: ['./nova-transferencia.component.scss'],
})
export class NovaTransferenciaComponent {
  @Output() aoTransferir = new EventEmitter<any>();

  //valor: number = 12; para dar um valor inicial
  valor: number;

  //destino: number = 222; para dar um valor inicial
  destino: number;

  //no constructor colocamos se há uma injeção de dependencia, neste caso para ser feita a transferencia, precisamos chamar a API através do componente TRansferencia Service
  constructor(private service: TransferenciaService, private router: Router){};

  transferir() {
    console.log('Solicitada nova transferência');
    const valorEmitir = { valor: this.valor, destino: this.destino };

    this.service.adicionar(valorEmitir).subscribe(
      (resultado) => {
        console.log(resultado);
        this.limparCampos();
        this.router.navigateByUrl('extrato');
      },
      (error) => console.error(error)
    );
  }

  limparCampos() {
    this.valor = 0;
    this.destino = 0;
  }
}
