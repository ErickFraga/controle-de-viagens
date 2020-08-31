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
import { IfStmt } from '@angular/compiler';

class Mes {
  mes: string
  gasto: number
  frete: number
  litros: number
  quilometros: number
  media: number
  quantidade_viagens: number
  constructor(params: Partial<Mes>) {
    this.mes = params.mes || null;
    this.gasto = params.gasto || 0;
    this.frete = params.frete || 0;
    this.litros = params.litros || 0;
    this.quilometros = params.quilometros || 0;
    this.media = params.media || 0;
    this.quantidade_viagens = params.quantidade_viagens || 0;
  }

}

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective
  freteTotal: number = 0
  despesaTotal: number = 0
  adiantamentoTotal: number = 0
  selectedCaminhao: string
  caminhoes: CaminhaoChart[] = []

  columns: string[] = ['Mes', 'Gasto', 'Frete', 'Litros', 'Quilometros', 'Media', 'Quantidade de Viagens']

  relatorioCaminhao: Mes[]

  constructor(
    private despesasService: DespesasService,
    private caminhoesService: CaminhoesService,
    private viagensService: ViagensService
  ) { }
  public pieChartLabels: string[] = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "stembro", "outubro", "novembro", "dezembro"];
  public pieChartData: ChartDataSets[] = []
  public pieChartType: string = 'line';
  lineChartOptions: ChartOptions = {
    responsive: true
  };
  lineChartColors: Colors[] = [
    {
      backgroundColor: 'rgba(123, 31, 162,0.3)',
      borderColor: 'rgba(123, 31, 162,1)',
    },

    {
      backgroundColor: 'rgba(105, 240, 174,0.3)',
      borderColor: 'rgba(105, 240, 174,1)',
    },

    {
      backgroundColor: 'rgba(244, 67, 54,0.3)',
      borderColor: 'rgba(244, 67, 54,1)',
    },

    {
      backgroundColor: 'rgba(54, 73, 244,0.3)',
      borderColor: 'rgba(54, 73, 244,1)',
    },

    {
      backgroundColor: 'rgba(244, 54, 158,0.3)',
      borderColor: 'rgba(244, 54, 158,1)',
    },

    {
      backgroundColor: 'rgba(54, 244, 219,0.3)',
      borderColor: 'rgba(54, 181, 244,1)',
    },


    {
      backgroundColor: 'rgba(244, 162, 54,0.3)',
      borderColor: 'rgba(244, 162, 54,1)',
    },


    {
      backgroundColor: 'rgba(241, 244, 54,0.2)',
      borderColor: 'rgba(241, 244, 54,1)',
    },




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
    this.relatorioCaminhao = [
      new Mes({}),
      new Mes({}),
      new Mes({}),
      new Mes({}),
      new Mes({}),
      new Mes({}),
      new Mes({}),
      new Mes({}),
      new Mes({}),
      new Mes({}),
      new Mes({}),
      new Mes({})
    ];
    /*  this.caminhoesService.GetAll().subscribe(caminhoes => {
        caminhoes.forEach(x => this.gerarRelatorioCaminhao(x.id));
      })
      console.log(this.relatorioCaminhao);
    */
    this.gerarRelatorioGeral();
    console.log('asdasdasdasdasdasd');

  }

  gerarRelatorioGeral() {


    this.caminhoesService.GetAll().subscribe((caminhoes: Caminhao[]) => {
      this.pieChartData = Array(caminhoes.length).fill({})
      caminhoes.forEach((caminhao: Caminhao) => {
        this.gerarRelatorioCaminhao(caminhao.id);

        let caminhaoChart: CaminhaoChart = new CaminhaoChart()
        caminhaoChart.caminhao = caminhao
        this.caminhoes.push(caminhaoChart)
      })
      this.viagensHandle()
      console.log(this.caminhoes);

      this.caminhoes.forEach(x => console.log(x.valoresMes))
    }, () => { }, () => {

    })
  }

  viagensHandle() {
    this.caminhoes.forEach((caminhao, index) => {
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
          }
        })
      })
    })
  }
  hasData() {
    return this.pieChartData.every(x => x.data)
  }

  gerarRelatorioCaminhao(id_caminhao: string) {
    this.relatorioCaminhao.forEach((x, i) => {
      x.mes = this.pieChartLabels[i]
      //x.quilometros = 0
      //x.frete = 0
      //x.gasto = 0
      //x.litros = 0
      x.media = 0
      //x.quantidade_viagens = 0
    })
    this.viagensService.getByCaminhao(id_caminhao).subscribe((viagens: Viagem[]) => {
      viagens.forEach(viagem => {
        let mes = Number(viagem.data_partida.split('/')[1]) - 1;
        if (viagem.data_chegada) {
          console.log(mes);

          console.log(viagem.km_chegada);
          console.log(viagem.km_partida);

          this.relatorioCaminhao[mes].quilometros += viagem.km_chegada - viagem.km_partida;
          this.relatorioCaminhao[mes].quantidade_viagens++;
        }
        viagem.despesas.forEach(x => this.despesasService.Get(x)
          .subscribe(despesa => {
            despesa.id = x;

            this.relatorioCaminhao[mes].gasto += despesa.valor;
            console.log(this.relatorioCaminhao[mes].gasto);


            if (despesa.tipo == 'combustivel') {
              /*
              console.log(mes);
              console.log(`ultimo km km: ${ultimoKm}`);
              console.log(despesa.id);
              */
              this.relatorioCaminhao[mes].litros += despesa.litros;
              if ((this.relatorioCaminhao[mes].litros > 0) && (this.relatorioCaminhao[mes].quilometros > 0)) {
                let media = this.relatorioCaminhao[mes].quilometros / this.relatorioCaminhao[mes].litros
                this.relatorioCaminhao[mes].media = this.twoDecimals(media)

              }
              console.log(`despesa km: ${despesa.km}`);
              console.log(`despesa litros: ${despesa.litros}`);
              console.log(`total km: ${this.relatorioCaminhao[mes].quilometros}`);
              console.log(`total litros: ${this.relatorioCaminhao[mes].litros}`);
            }
          })
        )
      })



    }, () => { },
      () => { })
    /*
    this.relatorioCaminhao.forEach(relatorio => {

      console.log(relatorio);

      if ((relatorio.litros > 0) && (relatorio.quilometros > 0)) {
        relatorio.media = relatorio.quilometros / relatorio.litros
      }
      console.log(relatorio.media);
    })
    */

  }

  clearRelatorio() {
    this.pieChartData = []

    this.freteTotal = 0
    this.despesaTotal = 0
    this.adiantamentoTotal = 0
    this.relatorioCaminhao.forEach(x => {
      x.frete = 0
      x.gasto = 0
      x.litros = 0
      x.quantidade_viagens = 0
      x.quilometros = 0
    })
  }

  getCaminhao(event) {
    this.clearRelatorio()

    if (event.value == 'geral') {
      this.caminhoes = []
      this.gerarRelatorioGeral();
    } else {
      var caminhao = this.caminhoes.find(x => x.caminhao.id == event.value)
      this.gerarRelatorioCaminhao(event.value)
      this.adiantamentoTotal = caminhao.adiantamento
      this.freteTotal = caminhao.frete
      this.despesaTotal = 0
      caminhao.valoresMes.forEach(despesa => {
        this.despesaTotal += despesa
      })
      this.pieChartData[0] = {
        label: caminhao.caminhao.placa,
        data: caminhao.valoresMes,
      }
    }
    this.chart.update()


  }

  async mesesHandle(caminhao) {
    await caminhao.despesas.forEach(async (id_despesa: string) => {
      await this.despesasService.Get(id_despesa).subscribe((despesa: Despesas) => {
        const value = Number(despesa.data.split('/')[1]) - 1
        caminhao.meses[value].push(despesa)
        caminhao.valoresMes[value] += Number(despesa.valor)
        this.despesaTotal += Number(despesa.valor);
        this.chart.update();
        //console.log(this.pieChartData);
      })
    })
  }

  twoDecimals(x: number) { return Number(Number.parseFloat(x.toString()).toFixed(2)) }

}
