import { Viagem } from './../../../models/viagens/classes/viagem';
import { Caminhao } from './../../../models/caminhoes/class/caminhao';
import { ViagensService } from './../../../models/viagens/services/viagens.service';
import { CaminhoesService } from './../../../models/caminhoes/services/caminhoes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DespesasService } from "src/models/despesas/services/despesas.service";
import { Despesas } from "src/models/despesas/classes/despesa";
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Colors, BaseChartDirective } from 'ng2-charts';
import { reduce } from 'rxjs/operators';

class CaminhaoChart {
  caminhao: Caminhao
  frete: number
  adiantamento: number
  despesas: string[]
  meses: Despesas[][]
  valoresMes: number[]
  constructor() {
    this.meses = [[], [], [], [], [], [], [], [], [], [], [], []]
    this.frete = 0
    this.adiantamento = 0
    this.despesas = []
    this.valoresMes = Array(12).fill(0)
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) Chart: BaseChartDirective

  freteTotal: number = 0
  despesaTotal: number = 0
  adiantamentoTotal: number = 0

  caminhoes: CaminhaoChart[] = []

  constructor(
    private despesasService: DespesasService,
    private caminhoesService: CaminhoesService,
    private viagensService: ViagensService
  ) { }
  public pieChartLabels: string[] = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro"];
  public pieChartData: ChartDataSets[] = []
  public pieChartType: string = 'line';
  lineChartOptions: ChartOptions = {
    responsive: true
  };
  lineChartColors: Colors[] = [

    { // dark grey
      backgroundColor: 'rgba(57, 34, 230,0.2)',
      borderColor: 'rgb(57, 34, 230)',
    },
    { // red
      backgroundColor: 'rgba(44, 230, 34,0.3)',
      borderColor: 'rgb(44, 230, 34)',
    },
    { // dark grey
      backgroundColor: 'rgba(217, 34, 230,0.2)',
      borderColor: 'rgb(217, 34, 230)',
    },
    { // red
      backgroundColor: 'rgba(34, 194, 230,0.3)',
      borderColor: 'rgb(34, 194, 230)',
    }

  ];
  lineChartLegend = true;
  // events on slice click
  public chartClicked(e: any): void {
    console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    console.log(e);
  }
  ngOnInit(): void {
    this.caminhoesService.GetAll().subscribe((caminhoes: Caminhao[]) => {
      this.pieChartData = Array(caminhoes.length).fill({})
      caminhoes.forEach((caminhao: Caminhao) => {
        let caminhaoChart: CaminhaoChart = new CaminhaoChart()
        caminhaoChart.caminhao = caminhao
        this.caminhoes.push(caminhaoChart)
      })
      this.viagensHandle()
    }, () => { })
  }

  viagensHandle() {
    this.caminhoes.forEach((caminhao, index) => {
      // ! criar os inputs
      this.viagensService.getByCaminhao(caminhao.caminhao.id).subscribe((viagens: Viagem[]) => {
        viagens.forEach((viagem: Viagem) => {
          caminhao.frete += Number(viagem.frete)
          caminhao.adiantamento += Number(viagem.adiantamento)
          caminhao.despesas.push(...viagem.despesas)
        })
      }, () => { }, () => {
        this.freteTotal += caminhao.frete
        this.adiantamentoTotal += caminhao.adiantamento
        this.mesesHandle(caminhao).finally(() => {
          this.pieChartData[index] = {
            label: caminhao.caminhao.placa,
            data: caminhao.valoresMes,
            backgroundColor: '#404040',
            borderColor: '#CCFFCC',
            hoverBackgroundColor: "red"
          }
        })
      })
    })
  }

  async mesesHandle(caminhao) {
    await caminhao.despesas.forEach(async (id_despesa: string) => {
      await this.despesasService.Get(id_despesa).subscribe((despesa: Despesas) => {
        const value = Number(despesa.data.split('/')[1]) - 1
        caminhao.meses[value].push(despesa)
        caminhao.valoresMes[value] += despesa.valor
        this.despesaTotal += Number(despesa.valor);
        this.Chart.update()
      })
    })
  }

  hasData() {
    return this.pieChartData.every(x => x.data)
  }
}
