import { Motorista } from 'src/models/motoristas/classes/motorista';
import { MotoristasService } from 'src/models/motoristas/services/motoristas.service';
import { CaminhoesService } from 'src/models/caminhoes/services/caminhoes.service';
// import { DespesasInsertComponent } from './../../components/despesas/despesas-insert/despesas-insert.component';
import { ComponentType } from '@angular/cdk/portal';
import { ViagensService } from './../../../models/viagens/services/viagens.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ViagensInsertComponent } from "../viagens-insert/viagens-insert.component";
import { Viagem } from 'src/models/viagens/classes/viagem';
import { Caminhao } from 'src/models/caminhoes/class/caminhao';
import { forkJoin } from 'rxjs';
import { firestore } from 'firebase';
@Component({
  selector: 'app-viagens-crud',
  templateUrl: 'viagens-crud.component.html'
})


export class ViagensCrudComponent implements OnInit {
  columns: string[] = [
    'Partida',
    'Chegada',
    'Motorista',
    'Frete',
    'Adiantamento',
    'Placa da Carreta',
    'Data de Partida',
    'Km de Partida',
  ]
  insert: ComponentType<any> = ViagensInsertComponent

  dataSource: any[];
  constructor(
    public viagensService: ViagensService,
    public caminhoesService: CaminhoesService,
    public motoristasService: MotoristasService,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    let motoristas: Motorista[];
    let caminhoes: Caminhao[];
    let viagens: Viagem[];

    this.viagensService.GetAll().subscribe(Viagens => {
      viagens = Viagens
      viagens.map((viagem: Viagem) => {
        this.caminhoesService.Get(viagem.placa_carreta).subscribe(caminhao => {
          viagem.placa_carreta = caminhao.placa
        })
        this.motoristasService.Get(viagem.motorista).subscribe(motorista => {
          viagem.motorista = motorista.nome;
        })
      })
      console.log(viagens)
      this.dataSource = viagens

    }, () => { }, () => { this.dataSource = viagens });


    /*
    forkJoin(firestore().collection("Motorista").get(), firestore().collection("Caminhao").get(), firestore().collection("Viagem").get())
      .subscribe(([motoristaJoin, caminhaoJoin, viagemJoin]) => {
        motoristas = motoristaJoin.docs.map(x => Object.assign({ id: x.id, ...x.data() }))
        caminhoes = caminhaoJoin.docs.map(x => Object.assign({ id: x.id, ...x.data() }))
        viagens = viagemJoin.docs.map(x => Object.assign({ id: x.id, ...x.data() }))

        console.log(motoristas);
        console.log(caminhoes);
        console.log(viagens);

        viagens.map(viagem => {
          console.log(viagem);
          console.log(motoristas[0])
          viagem.motorista = motoristas.find(motorista => motorista.id == viagem.motorista).nome;
          console.log(caminhoes);
          console.log(viagem.placa_carreta);

          viagem.placa_carreta = caminhoes.find(caminhao => caminhao.id == viagem.placa_carreta).placa;
        });
        this.dataSource = viagens;
        console.log(viagens);
      });
      */

  }

  openDialog(): void {
    let config = new MatDialogConfig()

    config = {
      position: {
        top: '10px',
        right: '10px'
      },
      height: '98%',
      width: '100vw',
      panelClass: 'full-screen-modal',
      disableClose: true,
      data: {}
    };

    const dialogRef = this.dialog.open(ViagensInsertComponent, config)



    dialogRef.afterClosed().subscribe(result => { })
  }
}