import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { RecargarComponent } from '../recargar/recargar.component';

export interface ConsOperador {
  usuario: string;
  operador: string;
  telefono: string;
  valor: number;
  fecha: Date
}

@Component({
  selector: 'app-consolidado',
  templateUrl: './consolidado.component.html',
  styleUrls: ['./consolidado.component.css'],
})
export class ConsolidadoComponent implements OnInit {
  displayedColumns: string[] = ['usuario', 'operador', 'telefono', 'valor', 'fecha'];
  dataSource:ConsOperador[] = [];
  selected = '';
  cantidadRecargas:number = 0;
  acumuladoRecargas:number = 0;
  constructor(private generalService:GeneralService,
              private dialog:MatDialog){}

  ngOnInit(): void {
    this.iniciar();
    this.cerrarDialogRecarga();
  }

  async iniciar(){
    let data:any = await this.generalService.obtenerConsolidadesOperador("1");
    if(!data.error){
      this.dataSource = data.objeto
          const sumaValores = this.dataSource.reduce(
            (acumulador, element) => acumulador + element.valor,
            this.acumuladoRecargas,
          );
          this.acumuladoRecargas = sumaValores;
          this.cantidadRecargas = this.dataSource.length;
    }
  }
  async selectorOperador(){
    console.log(this.selected)
    switch(this.selected){
      case '1':
        this.acumuladoRecargas = 0;
        let dataOp1:any = await this.generalService.obtenerConsolidadesOperador("1");
        if(!dataOp1.error){
          this.dataSource = dataOp1.objeto
          const sumaValores = this.dataSource.reduce(
            (acumulador, element) => acumulador + element.valor,
            this.acumuladoRecargas,
          );
          this.acumuladoRecargas = sumaValores;
          this.cantidadRecargas = this.dataSource.length;
        }
        break;
      case '2':
        this.acumuladoRecargas = 0;
        let dataOp2:any = await this.generalService.obtenerConsolidadesOperador("2");
        if(!dataOp2.error){
          this.dataSource = dataOp2.objeto;
          const sumaValores = this.dataSource.reduce(
            (acumulador, element) => acumulador + element.valor,
            this.acumuladoRecargas,
          );
          this.acumuladoRecargas = sumaValores;
          this.cantidadRecargas = this.dataSource.length;
        }
        break;
        case '3':
          this.acumuladoRecargas = 0;
          let dataOp3:any = await this.generalService.obtenerConsolidadesOperador("3");
          if(!dataOp3.error){
            this.dataSource = dataOp3.objeto;
            const sumaValores = this.dataSource.reduce(
              (acumulador, element) => acumulador + element.valor,
              this.acumuladoRecargas,
            );
            this.acumuladoRecargas = sumaValores;
            this.cantidadRecargas = this.dataSource.length;
          }
          break;
    }
  }
  abrirDialogRecarga(): void {
    const dialogRef = this.dialog.open(RecargarComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  cerrarDialogRecarga(): void {
    this.generalService.closeDialogRecarga.subscribe((result) => {
      console.log('entro por close')
      if(result){
        console.log('entro por close')
        this.dialog.closeAll();
      }
    })
    this.iniciar();
  }
}
