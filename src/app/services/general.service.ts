import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recarga } from '../entities/models/recarga';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  closeDialogRecarga: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  async obtenerConsolidadesOperador(operador: string) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `/datacenter/general/api/consolidado?oper=${operador}`;
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => { // Success
            console.log(res);
            resolve(res);
          },
          err => { // Error
            reject(err);
          }
        );
    });
    return promise;
  }
  async obtenerUsuarios() {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `/datacenter/general/api/listarUsuarios`;
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          err => { // Error
            reject(err);
          }
        );
    });
    return promise;
  }
  async enviarRecarga(recarga: Recarga) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `/datacenter/general/api/recargar`;
      this.http.post(apiURL,recarga)
        .toPromise()
        .then(
          res => { // Success
            console.log(res);
            resolve(res);
          },
          err => { // Error
            reject(err);
          }
        );
    });
    return promise;
  }
  // Método para emitir un nuevo valor
  emitirNuevoValor() {
    this.closeDialogRecarga.next(true);
  }
}
