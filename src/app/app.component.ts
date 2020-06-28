import { TipoDespesaService } from './../models/despesas/services/tipo-despesa.service';
import { Viagem } from './../models/viagens/classes/viagem';
import { ViagensService } from './../models/viagens/services/viagens.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front-controle';

  testViagem = {
    destino: 'Cariacica',
    motorista: 'Fulano',
    frete: 15000,
    adiantamento: 7500,
    frota: '013',
    placa_carreta: 'odj3309',
    data_partida: new Date(2020, 5, 10).toLocaleDateString(),
    data_chegada: new Date().toLocaleDateString(),
    km_partida: 7980325,
    km_chegada: 7980553,
    obs: '',
  }
  constructor(private viagensService: ViagensService, private tipoDespesaService: TipoDespesaService){
   
    tipoDespesaService.GetAll().subscribe((x:any) => {      
      localStorage.setItem('tipos-despesa', x[0].value.join(','))
      
    })
  }
  ngOnInit(){

  }



}
