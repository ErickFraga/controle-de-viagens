import { Viagem } from './../../../models/viagens/classes/viagem';
import { Caminhao } from './../../../models/caminhoes/class/caminhao';
import { ViagensService } from './../../../models/viagens/services/viagens.service';
import { CaminhoesService } from './../../../models/caminhoes/services/caminhoes.service';
import { Component, OnInit } from '@angular/core';
import { DespesasService } from "src/models/despesas/services/despesas.service";
import { Despesas } from "src/models/despesas/classes/despesa";



class CaminhaoChart {
  caminhao: Caminhao
  frete: number
  adiantamento: number
  despesas: Despesas[][]
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

/**
 * * variavies
 *  - total de kms rodados
 *  - total de dinheiro gasto
 *  - total de dinheiro gasto em gasolina
 *  - total de dinheiro gasto em despesas
 */


export class HomeComponent implements OnInit {
  freteTotal: number = 0
  despesaTotal: number = 0
  adiantamentoTotal: number = 0
  
  caminhoes: CaminhaoChart[] = []

  constructor(
    private despesasService: DespesasService,
    private caminhoesService: CaminhoesService,
    private viagensService: ViagensService
    ) {
      
    caminhoesService.GetAll().subscribe((caminhoes: Caminhao[]) => {
      caminhoes.forEach((caminhao: Caminhao) => {
        let caminhaoChart: CaminhaoChart = new CaminhaoChart()
        caminhaoChart.caminhao = caminhao
        caminhaoChart.despesas = []
        caminhaoChart.frete = 0
        caminhaoChart.adiantamento = 0
        viagensService.getByCaminhao(caminhao.id).subscribe((viagens: Viagem[]) => {
          viagens.forEach((viagem:Viagem) => {
            
            caminhaoChart.frete += Number(viagem.frete)
            caminhaoChart.adiantamento += Number(viagem.adiantamento)
            
            

            viagem.despesas.forEach((id_despesa:string) => {
              despesasService.Get(id_despesa).subscribe((despesa:Despesas)=>{
                caminhaoChart.despesas[Number(despesa.data.split('/')[1])-1].push(despesa)
                this.despesaTotal += Number(despesa.valor)
              })
            })
          })
        }, ()=>{}, ()=>{
          this.freteTotal += caminhaoChart.frete
          this.adiantamentoTotal += caminhaoChart.adiantamento
        })
        
        
        this.caminhoes.push(caminhaoChart)
      })
    }, ()=>{}, ()=>{
      console.log(this.caminhoes);
    })   
    
    
    viagensService.GetAll().subscribe(x => console.log(x))
    
    
  }
  
  ngOnInit(): void {
  }

  mesesHandler(){
    
  }
}
