import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/entities/dto/usuario';
import { Recarga } from 'src/app/entities/models/recarga';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recargar',
  templateUrl: './recargar.component.html',
  styleUrls: ['./recargar.component.css']
})
export class RecargarComponent implements OnInit {
  listaUsuarios:Usuario[] = [];
  constructor(
    private generalService: GeneralService,
  ){}

  async ngOnInit() {
    this.listaUsuarios = await this.generalService.obtenerUsuarios() as Usuario[]
  }
  recargaForm = new FormGroup({
    recarga: new FormControl(''),
    telefono: new FormControl(''),
    operador: new FormControl(''),
    usuario: new FormControl(''),
  })
  async enviarRecarga(){
    let recarga:Recarga = new Recarga;
    recarga.valor = Number(this.recargaForm.get('recarga').value);
    recarga.operador = Number(this.recargaForm.get('operador').value);
    recarga.telefono = this.recargaForm.get('telefono').value;
    recarga.usuario = Number(this.recargaForm.get('usuario').value);
    await this.generalService.enviarRecarga(recarga);
    Swal.fire({
      title: "Recarga Exitosa",
      text: "volviendo al consolidado...",
      icon: "success"
    }).then((result) => {
      if (result['isConfirmed']){
        console.log('confirmado')
        this.generalService.emitirNuevoValor();
      }
    });
  }
}
